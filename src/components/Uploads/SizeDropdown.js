import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'
export default function SizeDropdown(props) {
    const sizes = props.sizes
    const populateDropdownSize = (sizes) => {
        if (sizes) {
            return sizes.map(size => <option key={size.id} value={size.name.name}>{size.name.name}</option>)
        }
    }
    return (
        <Fragment>
            <Form.Group controlId="size">
                <Form.Label>Select Size:</Form.Label>
                <Form.Control as="select">
                    {sizes ? populateDropdownSize(sizes) : (<option value="no data">No Data at this moment</option>)}   
                </Form.Control>
            </Form.Group>
        </Fragment>
    )
}
