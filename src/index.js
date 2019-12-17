import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import AuthProvider from './contexts/AuthContext'
import WishListProvider from './contexts/WishListContext';

ReactDOM.render(
    <AuthProvider>
        <WishListProvider>
            <Home />
        </WishListProvider>
    </AuthProvider>
, document.getElementById('root'));
