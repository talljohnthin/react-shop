import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import AuthProvider from './contexts/AuthContext'

ReactDOM.render(
    <AuthProvider>
        <Home />
    </AuthProvider>
, document.getElementById('root'));
