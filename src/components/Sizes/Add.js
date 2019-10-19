import React, { Component, Fragment } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizes: '',
            show:false,
        }
    }
   
    handleUpdateStateSizes = e => {
        e.preventDefault()
        this.setState({
            sizes: e.target.value
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.props.handleAddNewSizes(this.state.sizes)
        this.setState({
            sizes:''
        })
       
    }
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleShow = () => {
        this.setState({
            show:true
        })
    }
    render() {
        return (
            <Fragment>
                <Button variant="primary" onClick={this.handleShow} style={ addButton }>
                <FontAwesomeIcon icon={faFile} /> New Size
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Size</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control placeholder="Like: Free size" name="size" value={ this.state.sizes } onChange={ this.handleUpdateStateSizes } />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                <FontAwesomeIcon icon={faTimes}/> Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={this.handleClose}>
                            <FontAwesomeIcon icon={faSave}/> Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                   
                </Modal>
                
            </Fragment>
        )
    }
}

const addButton = {
    marginTop:'10px',
    float:'right'
}