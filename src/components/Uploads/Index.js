import React, { Component, Fragment } from 'react'
import { ProgressBar, Form, Card } from 'react-bootstrap'
import './scss/index.scss'
import firebase from 'firebase/app'
import { db, storage } from '../../config/firebase'
import FileUploader from "react-firebase-file-uploader"
import uuid from 'react-uuid'
import { Container } from 'react-bootstrap'
import CategoryDropdown from './CategoryDropdown'
import SizesDropdown from './SizeDropdown'
import AddVariations from './AddVariations'
import AddVariationOptions from './AddVariationOptions'
import PriceSettings from './PriceSettings'

const container = {
    maxWidth: '600px',
    margin: '60px 0'
}
export default class Index extends Component {
    state = {
        categories: [],
        sizes: [],
        alertMessage: null,
        showAlert: false,
        alertType: 'success',
        filenames: [],
        downloadURLs: [],
        isUploading: false,
        uploadProgress: 0,
        variationsValue: [""],
        variations: [0],
        variationOptionValue: [""],
        variationOptions: [0],
        priceOptions:[]
    }
    alertTimeout = null

    componentDidMount() {
        this.getCategories()
        this.getSizes()
    }

    handleUploadStart = () => this.setState({
        isUploading: true,
        uploadProgress: 0
    });

    handleProgress = progress => this.setState({
        uploadProgress: progress
    });

    handleUploadError = error => {
        this.setState({
            isUploading: false
            // Todo: handle error
        });
        console.error(error);
    };

    handleUploadSuccess = async filename => {
        const downloadURL = await firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL();

        this.setState(oldState => ({
            filenames: [...oldState.filenames, filename],
            downloadURLs: [...oldState.downloadURLs, downloadURL],
            uploadProgress: 100,
            isUploading: false
        }));
    };

    getCategories = () => {
        db.collection("category")
            .onSnapshot(snapshot => {
                const categories = []
                snapshot.forEach(doc => {
                    const obj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    categories.push(obj)
                })
                this.setState({ categories })
            });
    }

    getSizes = () => {
        db.collection("sizes")
            .onSnapshot(snapshot => {
                const sizes = []
                snapshot.forEach(doc => {
                    const obj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    sizes.push(obj)
                })
                this.setState({ sizes })
            });
    }

    handleRemoveImage = i => {
        let filenames = [...this.state.filenames];
        let downloadURLs = [...this.state.downloadURLs]
        const imgRef = storage.ref('images/'+ this.state.filenames[i]);
        // Delete the file
        imgRef.delete().then(() => {
            console.log('image deleted success')
            filenames.splice(i, 1)
            downloadURLs.splice(i, 1)
            this.setState({
                filenames,
                downloadURLs
            })
       
        }).catch( error => {
            console.log(error)
        });
        console.log(this.state.filenames)
    }

    handleAddVariations = e => {
       const variation = 'variation-' + uuid()
       this.setState(prevState => ({ 
           variations: prevState.variations.concat([variation])
       }));
    }

    handleRemoveVariation = index => {
        const variationsValue = [...this.state.variationsValue]
        variationsValue.splice(index, 1)
        const variations = [...this.state.variations]
        variations.splice(index, 1)
        const priceOptions = [...this.state.priceOptions]
        priceOptions.splice(index, 1)
        this.setState({
            variationsValue,
            variations,
            priceOptions
        })
    }

    handleAddVariationValue = (e, index) => {
        const value = e.target.value
        const variationsValue = [...this.state.variationsValue],
              priceOptions = [...this.state.priceOptions]
        variationsValue[index] = value
        priceOptions[index] = { variation: value, options : [{}] }
        this.setState({
            variationsValue,
            priceOptions
        })
    }

    handleAddVariationOption = e => {
        const option = 'variation-option-' + uuid()
        this.setState(prevState => ({ 
            variationOptions: prevState.variationOptions.concat([option]) 
        }));
    }
 
    handleRemoveVariationOption = index => {
         const variationOptionValue = [...this.state.variationOptionValue]
         variationOptionValue.splice(index, 1)
         const variationOptions = [...this.state.variationOptions]
         variationOptions.splice(index, 1)
         const priceOptions = [...this.state.priceOptions]
         priceOptions.map(item => item.options.splice(index, 1))
         this.setState({
             variationOptionValue,
             variationOptions,
             priceOptions
         })
    }
 
    handleAddVariationOptionValue = (e, index) => {
         const value = e.target.value
         const variationOptionValue = [...this.state.variationOptionValue],
               priceOptions = [...this.state.priceOptions]
         variationOptionValue[index] = value
         
         priceOptions.map(item => {
            item.options[index] = {
                option: value,
                supplier_price: null,
                markup:null,
                selling_price: null,
                is_available: true
            }
         })
         this.setState({
             variationOptionValue,
             priceOptions
         })
    }
    
    handleSetPrice = (variation, index) => {
        //const priceOptions = [...this.state.priceOptions]
        console.log('variation:' + variation)
        console.log('option index:' + index)

       //// this.setState({
       ////     priceOptions
       // })
       
    }

    render() {
        console.log(this.state.priceOptions)
        const setPrice = this.state.variationsValue.map( (variation,index) => {
            let options = []
            this.state.variationOptionValue.map((option, optionIndex) => {
                const obj = {
                    option,
                    optionIndex
                }
                options.push(obj)
            })
            return <PriceSettings
                variation={variation} 
                key={index} 
                variationOptions = {options}
                setPrice = {this.handleSetPrice}
                />
        })
     
        return (
            <Fragment>
                <Container style={container}>
                    <div className="cards">
                        {this.state.downloadURLs.map((downloadURL, i) => {
                            return (
                                <Card key={i}>
                                    <Card.Img variant="top" src={downloadURL}/>
                                    <button onClick={e => this.handleRemoveImage(i)}>x</button>
                                </Card>
                            )
                        })}
                    </div>
                    <Form>
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name:</Form.Label>
                            <Form.Control type="text" placeholder="T-shirt" />
                        </Form.Group>
                        <CategoryDropdown categories={this.state.categories} />
                        <SizesDropdown sizes={this.state.sizes} />
                        <Form.Group controlId="descriptions">
                            <Form.Label>Descriptions:</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                    <button onClick={this.handleUpload}>Upload Images</button>
                    <FileUploader
                        accept="image/*"
                        name="image-uploader-multiple"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        multiple
                    />
                    <ProgressBar now={this.state.uploadProgress} label={`${this.state.uploadProgress}%`} />
                    <p>Filenames: {this.state.filenames.join(", ")}</p>
                    <AddVariations 
                        handleAddVariations = {this.handleAddVariations}
                        handleRemoveVariation = {this.handleRemoveVariation}
                        handleAddVariationValue = {this.handleAddVariationValue}
                        variations = { this.state.variations }
                    />
                    <AddVariationOptions
                        handleAddVariationOption = {this.handleAddVariationOption}
                        handleRemoveVariationOption = {this.handleRemoveVariationOption}
                        handleAddVariationOptionValue = {this.handleAddVariationOptionValue}
                        variationOptions = { this.state.variationOptions }
                    />
                    <h2>Set price</h2>
                    { setPrice }
                </Container>
            </Fragment>
        )
    }
}