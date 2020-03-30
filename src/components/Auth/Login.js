import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import firebase from '../../config/firebase'
import { Redirect } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext'
import './Scss/Index.scss'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useContext(AuthContext)

    if (redirect) {
        return <Redirect to="/" />
    }

    const handleLogin = async(e) => {
       e.preventDefault()
       setIsLoading(true)
       if ( email === '' || password === '') {
           setErrorMessage('Email and Password cannot be empty.')
           setIsLoading(false)
           return
       }
       const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch( err => {
            setIsLoading(false)
            setErrorMessage(err.message)
           return null
       })
       if ( user ) {
            dispatch({
                type: "LOGIN",
                payload: user
            })
            setIsLoading(false)
            setErrorMessage('')
            setRedirect(true)
       }
    }

    return (
        <Fragment>
            <Container className="login-container">
                <Card>
                    <Card.Header>
                        <h5>Admin User Login</h5>
                    </Card.Header>
                    <Card.Body>
                    <form>
                        <div className="form-row">
                            {
                                isLoading ? (<div className="alert alert-warning">Please wait...</div>) : 
                                errorMessage && (<div className="alert alert-danger">{errorMessage}</div>)
                            }
                            <label htmlFor="inputEmail">Email: </label>
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                            <label htmlFor="inputPassword">Password:</label>
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                            <button style={{backgroundColor:'#00807d', borderColor:'#00807d'}}type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                            {/* <button style={{backgroundColor:'#00807d', borderColor:'#00807d', marginTop:6}}type="submit" className="btn btn-primary" onClick={handleLogin}>Add New Admin</button> */}
                        </div>
                    </form>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )
}


export default Login
