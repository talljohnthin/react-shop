import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'
export default function SizeDropdown(props) {
    const segments = props.segments
    const populateDropdownSize = (segments) => {
        if (segments) {
            return segments.map(segment => <option key={segment.id} value={segment.name.name}>{segment.name.name}</option>)
        }
    }
    return (
        <Fragment>
            <Form.Group controlId="size">
                <Form.Label>Select Segments:</Form.Label>
                <Form.Control as="select">
                    {segments ? populateDropdownSize(segments) : (<option value="no data">No Data at this moment</option>)}   
                </Form.Control>
            </Form.Group>
        </Fragment>
    )
}
