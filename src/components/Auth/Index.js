import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import firebase from './../../config/firebase'
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
    
    handleLogin = (e) => {
        e.preventDefault()
        const email = document.getElementById('inputEmail').value
        const password = document.getElementById('inputPassword').value

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user) => {
            console.log('successfully login')
            (<Redirect from="*" to="/" />)
        })
        .catch( error => error.toString())
    }
    handleSignup = (e) => {
        e.preventDefault()
        const email = document.getElementById('inputEmail').value
        const password = document.getElementById('inputPassword').value
 
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((user) => {
            console.log('Registered Successfully!')
        })
        .catch( error => console.log(error.toString()))
    }

    render() {
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
                    <button type="submit" className="btn btn-primary" onClick={this.handleLogin}>Login</button>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSignup}>Sign up</button>
                </form>
                </Container>
            </Fragment> 
        )
    }
}
