import React from 'react'
export default function Index(props) {
    const {showAlert, message, type} = props
    const alertStyle = {
        position: 'absolute',
        top: showAlert ? '0' : '-100%' ,
        left:'50%',
        transform:'translateX(-20%)',
        transition: 'all ease 0.25s',
        padding:'10px 20px'
    }
    console.log(showAlert)
    return (
        <div className="alert" className={ type == 'success' ? 'alert-success' : 'alert-danger'} style={alertStyle}>
            {message}
        </div>
    )
}
