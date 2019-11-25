import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'
export default function SegmentDropdown(props) {
    const segments = props.segments
    const populateDropdownSegment = (segments) => {
        if (segments) {
            return segments.map(segment => <option key={segment.id} value={segment.name.name}>{segment.name.name}</option>)
        }
    }
    const addSelectedSegment = (segment) => {
        props.handleAddSectedSegmentToState(segment)
    }
    return (
        <Fragment>
            <Form.Group controlId="size">
                <Form.Label>Select Segments:</Form.Label>
                <Form.Control onChange={ (e) => addSelectedSegment(e.target.value)} as="select">
                    {segments ? populateDropdownSegment(segments) : (<option value="no data">No Data at this moment</option>)}   
                </Form.Control>
            </Form.Group>
        </Fragment>
    )
}
