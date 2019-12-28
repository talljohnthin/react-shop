import React, { Fragment, useState, useEffect, useContext } from 'react'
import Product from './Product'
import { Container } from 'react-bootstrap'
import { db } from '../../config/firebase'
import Loader from 'react-loader-spinner'
import { ProductContext } from '../../contexts/ProductContext'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './Sass/Style.scss'

const Products = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const {productState, productDispatch} = useContext(ProductContext)
    
    useEffect(()=> {
        getCategories();
        getProducts();
        setProducts(productState.products)
    }, [])

    const getCategories = () => {
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
            setCategories(categories)
        });
    }

    const getProducts = () => {
       db.collection("products")
        .where("status", "==", "available")
        .onSnapshot(snapshot => {
            const products = []
            snapshot.forEach(doc => {
                const product = {
                    id: doc.id,
                    data: doc.data()
                }
                products.push(product)
            })
            productDispatch({
                type:'ADD_PRODUCT',
                payload: [...products]
            })
            setProducts(products)
        }); 
    }

    const filterItem = categories.map(e => <li key={e.id}>{e.name.name}</li>)
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
                        {
                            products.length <= 0 ? <Loader
                                className="loader-spin"
                                type="TailSpin"
                                color="#39A7AB"
                                height={50}
                                width={50}
                                timeout={3000}
                       
                            /> : ''
                        }
                    </ul>
                    <div className="row product-list">
                        { 
                           products && products.map( product => <Product key={ product.id } data={ product }/>) 
                        }
                        <div className="card"></div>
                    </div>
                </div>
            </Container>
        </Fragment>
    )
}

export default Products
