import React, { Component } from 'react'
import Product from './Product'
import AddProducts from './AddProducts'
import './Sass/Style.scss'
import { Container } from 'react-bootstrap'
export default class Products extends Component {
    render() {
        return (
            <Container>
                <div className="col">
                    <div className="row product-list">
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </div>
                    <div className="add">
                        <AddProducts />
                    </div>
                </div>
            </Container>
        )
    }
}
