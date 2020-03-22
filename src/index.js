import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import AuthProvider from './contexts/AuthContext'
import WishListProvider from './contexts/WishListContext';
import ProductProvider from './contexts/ProductContext'

ReactDOM.render(
    <AuthProvider>
        <ProductProvider>
            <WishListProvider>
                <Home />
            </WishListProvider>
        </ProductProvider>
    </AuthProvider>
, document.getElementById('root'));

