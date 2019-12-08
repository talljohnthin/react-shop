import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Product from './Product'
import { db } from '../../config/firebase'
import './Sass/Index.scss'

export default class Index extends Component {

    state = {
        products:[]
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        this.getProducts();
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    getProducts() {
        db.collection("products")
        .onSnapshot(snapshot => {
            const products = []
            snapshot.forEach(doc => {
                const product = {
                    id: doc.id,
                    data: doc.data()
                }
                products.push(product)
            })
            if ( this._isMounted ) {
                this.setState({ products })
            }
        });
    }

    render() {
        return (
            <Fragment>
                <div className="hero">
                    <Container>
                        <h1>Update Products</h1>
                    </Container>
                </div>
                <div className="UPDATE-product">
                <Container>
                    <div className="UPDATE-product-list">
                        {
                            this.state.products ? this.state.products.map( product => <Product key={ product.id } data={ product }/>) : ''
                        }
                    </div>
                </Container>
                </div>
            </Fragment>
        )
    }
}
