import React, { Fragment, useContext, useState } from 'react'
import { Container, Card } from 'react-bootstrap'
import firebase from '../../config/firebase'
import { Redirect } from "react-router-dom";

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (redirect) {
        return <Redirect to="/" />
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        setIsLoading(true)
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result) => {
            setPassword('')
            setEmail('')
            return result.user.updateProfile({
                displayName: name,
                phoneNumber: phone
            }).then(() => {
                setName('')
                setPhone('')
                setIsLoading(false)
                setSuccessMessage('Signed Up Successfully')
                setRedirect(true)
            })
        })
        .catch( error => {
            setErrorMessage(error)
            setIsLoading(false)
        })
    }
    return (
        <Fragment>
            <Container className="login-container">
                <Card>
                    <Card.Header>
                        <h5>Add New Admin User</h5>
                    </Card.Header>
                    <Card.Body>
                        <form>
                            <div className="form-row">
                                {
                                    successMessage && (<div className="alert alert-success">{successMessage}</div>)
                                }
                                {   
                                    isLoading ? (<div className="alert alert-warning">Please wait...</div>) : 
                                    errorMessage && (<div className="alert alert-danger">{errorMessage}</div>)
                                }
                                <label htmlFor="inputName">Name</label>
                                <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={e => setName(e.currentTarget.value)} />
                                <label htmlFor="inputPhone">Phone</label>
                                <input type="text" className="form-control" placeholder="Phone" value={phone} onChange={e => setPhone(e.currentTarget.value)} />
                                <label htmlFor="inputEmail">Email</label>
                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                                <label htmlFor="inputPassword">Password</label>
                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" />
                                <button style={{backgroundColor:'#00807d', borderColor:'#00807d'}} type="submit" className="btn btn-primary" onClick={() => handleSignUp()}>SignUp</button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
                
            </Container>
        </Fragment> 
    )
}


export default SignUp
