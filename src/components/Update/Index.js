import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Product from './Product'
import  { Redirect } from 'react-router-dom'
import { db } from '../../config/firebase'
import './Sass/Index.scss'
import { AuthContext } from './../../contexts/AuthContext'

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
                <AuthContext.Consumer>
                    {(value) => {
                    if(Object.keys(value.state.user).length === 0 || value.state.user === null) {
                            return <Redirect to='/'  />
                    }
                    }}
                </AuthContext.Consumer>
                <div className="hero">
                    <Container>
                        <h1>Edit Products</h1>
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
