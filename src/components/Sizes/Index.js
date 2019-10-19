import React, { Component, Fragment } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import List from './List'
import Add from './Add'
import { db } from '../../config/firebase'
import Alert from '../Alert/Index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl } from '@fortawesome/free-solid-svg-icons'

const container = {
    maxWidth: '600px',
    marginTop: '60px'
}
export default class Index extends Component {
    state = {
        sizes: [],
        alertMessage: null,
        showAlert: false,
        alertType: 'success'
    }
    alertTimeout = null

    componentDidMount() {
        db.collection("sizes")
            .onSnapshot(snapshot => {
                const sizes = []
                snapshot.forEach(doc => {
                    const obj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    sizes.push(obj)
                })
                this.setState({ sizes })
            });
        this.setState({ isLoading: true })
        db.collection("sizes")
            .onSnapshot(snapshot => {
                const sizeList = []
                snapshot.forEach(doc => {
                    const dataObj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    sizeList.push(dataObj)

                })
                this.setState({
                    sizeList,
                    isLoading: false
                })
            })
    }
    handleAddNewSizes = (newSize) => {
        if (newSize.length > 3) {
            db.collection("sizes").add({
                name: newSize
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            const alertObj = {
                type: 'success',
                message: 'New Size Added Successfuly!'
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
                message: 'Character must be greater than 3.'
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
    handleRemoveSizes = (id) => {
        db.collection("sizes").doc(id).delete().then(function () {
            console.log('deleted')
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
        const alertObj = {
            type: 'success',
            message: 'Size Deleted Successfuly!'
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
            (<div className="loading">Loading Sizes...</div>) :
            (<List
                sizeList={this.state.sizes}
                handleRemoveSizes={this.handleRemoveSizes}
            />
            )

        return (

            <Fragment>
                <Container style={container}>
                    <Alert
                        showAlert={this.state.showAlert}
                        type={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                    <ListGroup as="ul">
                        <ListGroup.Item as="li" active>
                            <FontAwesomeIcon icon={faListOl} /> List of Sizes
                        </ListGroup.Item>
                        {isLoading}
                    </ListGroup>

                    <Add
                        handleAddNewSizes={this.handleAddNewSizes}
                    />
                </Container>
            </Fragment>
        )
    }
}
