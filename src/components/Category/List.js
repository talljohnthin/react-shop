import React, { Fragment, Component } from 'react'
import { Modal , Button } from 'react-bootstrap'

export default class List extends Component {

    state = {
        show:false,
        idToRemove:null
    }

    removeCategory = () => {
        if(this.state.idToRemove) {
            this.props.handleRemoveCategory(this.state.idToRemove)
            this.setState({
                show:false
            })
        }
    }
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleShow(id) {
        this.setState({
            show:true,
            idToRemove: id
        })
    }
    render() {
        const list = this.props.categoryList.map(doc => {
            return (<li key={doc.id} className="list-group-item list-group-item-action"> {doc.name.name}
                <button className="btn btn-danger" onClick={() => this.handleShow(doc.id)}>remove</button>
            </li>)
        })
        return (
            <Fragment>
                {list}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={ this.handleClose }>Cancel</Button>
                        <Button variant="primary" onClick={ this.removeCategory }>Remove</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}
