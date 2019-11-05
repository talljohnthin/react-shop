import React from 'react'

export default function AddPrice({variation, variationOptions}) {
    let mapOptions = null
    if (variationOptions) {
        mapOptions = variationOptions.map( (o,i) => {
            return <li key={i}>{ o }</li>
        })
    }
   console.log(mapOptions)
    return (
        <div>

        </div>
    )
}
