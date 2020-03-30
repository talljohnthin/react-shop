import React, { Component, Fragment } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import List from './List'
import Add from './Add'
import { db } from '../../config/firebase'
import Alert from '../Alert/Index'
import Hero from './../Hero/Index'
import { AuthContext } from './../../contexts/AuthContext'
import  { Redirect } from 'react-router-dom'

const container = {
    padding:30,
    paddingTop:0
}
export default class Index extends Component {
    state = {
        segments: [],
        alertMessage: null,
        showAlert: false,
        alertType: 'success'
    }
    alertTimeout = null

    componentDidMount() {
        db.collection("segments")
            .onSnapshot(snapshot => {
                const segments = []
                snapshot.forEach(doc => {
                    const obj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    segments.push(obj)
                })
                this.setState({ segments })
            });
        this.setState({ isLoading: true })
        db.collection("segments")
            .onSnapshot(snapshot => {
                const segmentsList = []
                snapshot.forEach(doc => {
                    const dataObj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    segmentsList.push(dataObj)

                })
                this.setState({
                    segmentsList,
                    isLoading: false
                })
            })
    }
    handleAddNewSegments = (newSegments) => {
        if (newSegments.length > 2) {
            db.collection("segments").add({
                name: newSegments
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            const alertObj = {
                type: 'success',
                message: 'New Segments Added Successfuly!'
            }
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout)
                this.setState({
                    showAlert: false
                }, () => {
                    this.alertTimeout = setTimeout(() => {
                        this.handleShowAlert(alertObj)
                    }, 250)
                })
            } else {
                this.handleShowAlert(alertObj)
            }
        } else {
            const alertObj = {
                type: 'failed',
                message: 'Character must be greater than 2.'
            }
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout)
                this.setState({
                    showAlert: false
                }, () => {
                    this.alertTimeout = setTimeout(() => {
                        this.handleShowAlert(alertObj)
                    }, 250)
                })
            } else {
                this.handleShowAlert(alertObj)
            }
        }
    }
    handleShowAlert = ({ message, type }) => {
        this.setState({
            showAlert: true,
            alertMessage: message,
            alertType: type
        }, () => {
            this.alertTimeout = setTimeout(() => {
                this.setState({
                    showAlert: false,
                })
            }, 3000)
        })
    }
    handleRemoveSegments = (id) => {
        db.collection("segments").doc(id).delete().then(function () {
            console.log('deleted')
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
        const alertObj = {
            type: 'success',
            message: 'Segment Deleted Successfuly!'
        }
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout)
            this.setState({
                showAlert: false
            }, () => {
                this.alertTimeout = setTimeout(() => {
                    this.handleShowAlert(alertObj)
                }, 250)
            })
        } else {
            this.handleShowAlert(alertObj)
        }
    }

    render() {
        const isLoading = this.state.isLoading ?
            (<div className="loading">Loading segments...</div>) :
            (<List
                segmentsList={this.state.segments}
                handleRemoveSegments={this.handleRemoveSegments}
            />
            )

        return (
            <Fragment>
                <AuthContext.Consumer>
                    {(value) => {
                    if(Object.keys(value.state.user).length === 0 || value.state.user === null) {
                            return <Redirect to='/'  />
                    }
                    }}
                </AuthContext.Consumer>
                <Hero title="Segments" />
                <Container style={container}>
                    <Alert
                        showAlert={this.state.showAlert}
                        type={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                    
                    <Card>
                        <Card.Header>
                            <h5>List of segments</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup as="ul">
                                {isLoading}
                            </ListGroup>
                            <Add
                                handleAddNewSegments={this.handleAddNewSegments}
                            />
                        </Card.Body>
                    </Card>
                    
                </Container>
            </Fragment>
        )
    }
}
