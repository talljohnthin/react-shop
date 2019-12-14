import React, { Component, Fragment, useContext } from 'react'
import { Container } from 'react-bootstrap'
import firebase from '../../config/firebase'
import { Redirect } from "react-router-dom";

const SignUp = () => {
    const handleSignup = (e) => {
        e.preventDefault()
        const email = document.getElementById('inputEmail').value
        const password = document.getElementById('inputPassword').value
 
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((user) => {
            console.log('Registered Successfully!')
        })
        .catch( error => console.log(error.toString()))
    }
    return (
        <Fragment>
            <Container>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignup}>Sign up</button>
            </form>
            </Container>
        </Fragment> 
    )
}


export default SignUp
