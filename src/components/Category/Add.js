import React, { Component, Fragment } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default class Add extends Component {
    state = {
        category: '',
        show:false,
    }
    handleUpdateStateCategory = e => {
        e.preventDefault()
        this.setState({
            category: e.target.value
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.props.handleAddNewCategory(this.state.category)
    }
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleShow = () => {
        console.log('hi')
        this.setState({
            show:true
        })
    }
    render() {
        return (
            <Fragment>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Category
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control name="category" value={ this.state.category } onChange={ this.handleUpdateStateCategory } />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                            Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={this.handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                   
                </Modal>
                
            </Fragment>
        )
    }
}
