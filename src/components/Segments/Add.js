import React, { Component, Fragment } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            segments: '',
            show:false,
        }
    }
   
    handleUpdateStateSegments = e => {
        e.preventDefault()
        this.setState({
            segments: e.target.value
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.props.handleAddNewSegments(this.state.segments)
        this.setState({
            segments:''
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
                <FontAwesomeIcon icon={faPlus} style={{fontSize:14}}/> Add New Segment
                </Button>
                <Modal 
                    show={this.state.show} 
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Form onSubmit={this.handleFormSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Segments</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control placeholder="Like: Free Segment" name="Segment" value={ this.state.segments } onChange={ this.handleUpdateStateSegments } />
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