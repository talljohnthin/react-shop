import React, { Component, Fragment } from 'react'
import { db } from '../../config/firebase'
import { Container } from 'react-bootstrap'
import CategoryDropdown from './CategoryDropdown'
import SizesDropdown from './SizeDropdown'
const container = {
    maxWidth: '600px',
    marginTop: '60px'
}
export default class Index extends Component {
    state = {
        categories: [],
        sizes:[],
        alertMessage: null,
        showAlert: false,
        alertType: 'success'
    }
    alertTimeout = null

    componentDidMount() {
        this.getCategories()
        this.getSizes()
    }

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
    getImageFiles = (e) => {
        const images = e.target.files
        for ( let i = 0; i < images.length; i++ ) {
            console.log(e.target.files[i].name)
        }
    }

    render() {
        return (
            <Fragment>
                <Container style={container}>
                    <CategoryDropdown categories={this.state.categories}/>
                    <SizesDropdown sizes={this.state.sizes} />
                    <input type="file" multiple onChange={this.getImageFiles}/>
                </Container>
            </Fragment>
        )
    }
}
