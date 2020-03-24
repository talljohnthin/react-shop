import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export const formatOrderDate = date => {
    if(date) {
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const dateSplitted = date.split("-")
        return `${ months[dateSplitted[1]] } ${ dateSplitted[2] }, ${ dateSplitted[0] }`
    } else {
        return
    }  
}

export const Spinner = () => {
    return <Loader
        type="Puff"
        color="#00BFFF"
        height={40}
        width={40}
        timeout={3000} //3 secs
    />
}
