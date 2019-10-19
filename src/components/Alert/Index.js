import React, { Fragment } from 'react'
import { Alert } from 'react-bootstrap'
export default function Index(props) {
    const { showAlert, message, type } = props
    const alertStyle = {
        position: 'absolute',
        top: showAlert ? '0' : '-100%',
        left: '50%',
        transform: 'translateX(-20%)',
        transition: 'all ease 0.25s',
    }

    return (
        <Fragment>
            <Alert variant={ type == 'success' ? 'success' : 'danger'} style={alertStyle}>
                <p>{ message }</p>
            </Alert>
        </Fragment>
    )
}
