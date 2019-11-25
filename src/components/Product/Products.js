import React, { Component, Fragment } from 'react'
import Product from './Product'
import AddProducts from './AddProducts'
import './Sass/Style.scss'
import { Container } from 'react-bootstrap'
import firebase from 'firebase/app'
import { db, storage } from '../../config/firebase'

export default class Products extends Component {

    state = {
        categories : [],
        products:[]
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
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
            this.setState({ products })
        });
    }

    render() {
        console.log(this.state.products)
        const filterItem = this.state.categories.map(e => <li key={e.id}>{e.name.name}</li>)
        return (
            <Fragment>
                <ul className="home-filter">
                    <li>MEN</li>
                    <li>WOMEN</li>
                    <li>KIDS</li>
                    <li>OTHERS</li>
                </ul>
                <Container>
                    <div>
                        <ul className="home-filter-categories">
                            { filterItem }
                        </ul>
                        <div className="row product-list">
                            {
                                this.state.products.map( product => <Product key={ product.id } data={ product }/>)
                            }
                            <div className="card"></div>
                        </div>
                    </div>
                </Container>
            </Fragment>
        )
    }
}
