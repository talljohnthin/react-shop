import React, { Component, Fragment } from 'react'
import { ProgressBar, Form, Card, Button } from 'react-bootstrap'
import './scss/index.scss'
import firebase from 'firebase/app'
import { db, storage } from '../../config/firebase'
import FileUploader from "react-firebase-file-uploader"
import uuid from 'react-uuid'
import { Container } from 'react-bootstrap'
import CategoryDropdown from './CategoryDropdown'
import SegmentsDropdown from './SegmentsDropdown'
import AddVariations from './AddVariations'
import AddVariationOptions from './AddVariationOptions'
import PriceSettings from './PriceSettings'
import Alert from '../Alert/Index'

const container = {
    maxWidth: '600px',
    margin: '60px auto',
    float:'none'
}
const imageUpload = {
    backgroundColor: '#39A7AB', 
    color: 'white', 
    padding: 10, 
    borderRadius: 4, 
    cursor: 'pointer',
    display:'flex',
    alignItems:'center',
    marginBottom:'15px',
    justifyContent:'center'
}
export default class Index extends Component {
    
    state = {
        categories: [],
        segments: [],
        alertMessage: null,
        showAlert: false,
        alertType: 'success',
        filenames: [],
        downloadURLs: [],
        isUploading: false,
        uploadProgress: 0,
        variationsValue: [],
        variations: [],
        variationOptionValue: [],
        variationOptions: [],
        priceOptions:[],
        productName:'',
        selectedSegment:null,
        selectedCategory:null,
        productDescriptions:null,
        cover:''
    }
    alertTimeout = null
    

    componentDidMount() {
        this.getCategories()
        this.getSegments()

    }
    componentWillUnmount() {
    }

    handleShowAlert = ({ message, type }) => {
        this.setState({
            showAlert: true,
            alertMessage: message,
            alertType: type
        }, () => {
            this.alertTimeout = setTimeout(() => {
                this.setState({
                    showAlert: false,
                })
            }, 3000)
        })
    }
    handleAlertMessage = (status, message) => {
        const alertObj = {
            type: status,
            message
        }
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout)
            this.setState({
                showAlert: false
            }, () => {
                this.alertTimeout = setTimeout(() => {
                    this.handleShowAlert(alertObj)
                }, 250)
            })
        } else {
            this.handleShowAlert(alertObj)
        }
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

    getSegments = () => {
        db.collection("segments")
            .onSnapshot(snapshot => {
                const segments = []
                snapshot.forEach(doc => {
                    const obj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    segments.push(obj)
                })
                this.setState({ segments })
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
                downloadURLs,
                cover: ''
            })
       
        }).catch( error => {
            console.log(error)
        });
    }

    handleAddVariations = e => {
       const variation = 'variation-' + uuid()
       this.setState(prevState => ({ 
           variations: prevState.variations.concat([variation]),
           variationOptions: [],
           variationOptionValue:[]
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
                price: null,
                is_available: 'Yes'
            }
         })
         this.setState({
             variationOptionValue,
             priceOptions
         })
    }
    
    handleSetPrice = (variationIndex, optionIndex, value) => {
        const priceOptions = [...this.state.priceOptions]
        priceOptions[variationIndex].options[optionIndex].price = value
        this.setState({
            priceOptions
        })
    }

    handleSetAvailability = (variationIndex, optionIndex, value) => {
        const priceOptions = [...this.state.priceOptions]
        priceOptions[variationIndex].options[optionIndex].is_available = value
        this.setState({
            priceOptions
        })
    }

    handleAddNameToState = (name) => {
        this.setState({
            productName: name
        })
    }

    handleAddSectedSegmentToState = (segment) => {
        this.setState({
           selectedSegment: segment
        })
    }

    handleAddSectedCategoryToState = (category) => {
        this.setState({
           selectedCategory: category
        })
    }

    handleSetCover = (url) =>  {
       //console.log(this.cardRef.current.class)
        this.setState({
            cover: url
        })
    }

    handleAddDescriptionsToState = (descriptions) => {
        this.setState({
            productDescriptions: descriptions
        })
    }

    handleProductEntry = () => {
        const product = {
            productName : this.state.productName,
            segment : this.state.selectedSegment,
            category: this.state.selectedCategory,
            descriptions: this.state.productDescriptions,
            productImages : this.state.downloadURLs,
            priceOptions : this.state.priceOptions,
            cover : this.state.cover,
            status : 'available',
            timestamp: Math.floor(Date.now() / 1000)
        }

        if (product.cover == '') {
            this.handleAlertMessage('failed', 'Please select product cover!')
            return; 
        }

        if (!product.productName) {
            this.handleAlertMessage('failed', 'Please enter product name!')
            return; 
        }

        if (!product.segment) {
            this.handleAlertMessage('failed', 'Please select segment!')
            return; 
        }

        if (!product.category) {
            this.handleAlertMessage('failed', 'Please select category!')
            return; 
        }

        if (product.productImages.length < 1) {
            this.handleAlertMessage('failed', 'Please add atleast one image!')
            return; 
        }

        if (product.priceOptions.length < 1) {
            this.handleAlertMessage('failed', 'Please set variation!')
            return; 
        }

        if (product.priceOptions.length > 0) {
            let isPrice = true;
            if (JSON.stringify(product.priceOptions[0].options[0]) === '{}') {
                this.handleAlertMessage('failed', 'Please set price option!')
                return;
            } 
            product.priceOptions.map( variation => {
                variation.options.map(option => {
                    if (option.price == null) {
                        isPrice = false
                    }
                })
            })
            if ( !isPrice ) {
                this.handleAlertMessage('failed', 'Please set all option price!')
                return;
            }
        }
        //add products
        db.collection("products").add(product)
        .then( docRef => {
            this.handleAlertMessage('success', 'New product has been added!')
            this.setState({
                filenames: [],
                downloadURLs: [],
                isUploading: false,
                uploadProgress: 0,
                variationsValue: [],
                variations: [],
                variationOptionValue: [],
                variationOptions: [],
                priceOptions:[],
                productName:null,
                productDescriptions:null,
                cover:''
            })
        })
        .catch(error => {
            this.handleAlertMessage('failed', 'Failed to add product!')
            console.error("Error adding document: ", error);
        });
    }

    render() {
        console.log("PriceOptions: ", this.state.priceOptions)
        console.log("Product Name: ", this.state.productName)
        console.log("Product Segment: ", this.state.selectedSegment)
        console.log("Product Category: ", this.state.selectedCategory)
        console.log("Product Descriptions: ", this.state.productDescriptions)
        console.log("Product Images: ", this.state.downloadURLs)
        console.log("Product Cover: ", this.state.cover)
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
                variationIndex={index}
                key={index}
                variationOptions = {options}
                setPrice = {this.handleSetPrice}
                setAvailability = {this.handleSetAvailability}
                />
        })
     
        return (
            <Fragment>
                <div className="hero">
                    <Container>
                        <h1>Edit Product</h1>
                    </Container>
                </div>
                <Container style={container} className="add-entry-products-container" >

                    <Alert
                        showAlert={this.state.showAlert}
                        type={this.state.alertType}
                        message={this.state.alertMessage}
                    />

                    <ProgressBar hidden now={this.state.uploadProgress} label={`${this.state.uploadProgress}%`} />
                    
                    <p hidden>Filenames: {this.state.filenames.join(", ")}</p>

                    <label style={ imageUpload }>
                        <ion-icon name="add"></ion-icon> Add Images
                        <FileUploader
                            hidden
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
                    </label>

                    <div className="cards">
                        {this.state.downloadURLs.map((downloadURL, i) => {
                            return (
                                <Card className={ this.state.cover === downloadURL ? 'card-cover' : ''} key={i} onClick={e => this.handleSetCover(downloadURL)}>
                                    <Card.Img variant="top" src={downloadURL}/>
                                    <Button className="card-close" onClick={e => this.handleRemoveImage(i, downloadURL)}><ion-icon name="close"></ion-icon></Button>
                                </Card>
                            )
                        })}
                    </div>

                    <Form className="add-entry-form">
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name:</Form.Label>
                            <Form.Control onChange={(e) => this.handleAddNameToState(e.target.value) } value={this.state.productName || ''} type="text" />
                        </Form.Group>
                        <CategoryDropdown handleAddSectedCategoryToState={this.handleAddSectedCategoryToState} categories={this.state.categories} />
                        <SegmentsDropdown handleAddSectedSegmentToState={this.handleAddSectedSegmentToState} segments={this.state.segments} />
                        <Form.Group controlId="descriptions">
                            <Form.Label>Descriptions:</Form.Label>
                            <Form.Control onChange={(e) => this.handleAddDescriptionsToState(e.target.value) } value={this.state.productDescriptions || ''}  as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                    
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
                    { setPrice ? (<div className="price-title">Set the price below:</div>) : ''}
                    { setPrice }

                    <Button className="btn-product-save" onClick={this.handleProductEntry}> <ion-icon name="add"></ion-icon> Add New Product</Button>
                
                </Container>
            </Fragment>
        )
    }
}