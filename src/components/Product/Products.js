import React, { Component, Fragment } from 'react'
import Product from './Product'
import AddProducts from './AddProducts'
import './Sass/Style.scss'
import { Container } from 'react-bootstrap'
import firebase from 'firebase/app'
import { db, storage } from '../../config/firebase'

export default class Products extends Component {

    state = {
        categories : []
    }

    componentDidMount() {
        this.getCategories();
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
    render() {
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
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <div className="card"></div>
                        </div>
                    </div>
                </Container>
            </Fragment>
        )
    }
}
