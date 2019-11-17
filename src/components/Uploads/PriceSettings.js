import React, {Fragment} from 'react'
import {FormControl} from 'react-bootstrap'

export default function PriceSettings ({variation, variationOptions, setPrice}) {
    let mapOptions = null
    const handleSetPrice = () => {
        console.log(variation)
        const obj = {
            variation: variation,
            options: []
        }
        console.log(obj)
    }
    if (variationOptions) {
        mapOptions = variationOptions.map( (o,i) => {
            return (
                <ul key={o.optionIndex} className="each-variation-table-items">
                     <li>{ o.option }</li>
                     <li><FormControl onChange={handleSetPrice}></FormControl></li>
                     <li><FormControl></FormControl></li>
                     <li>Selling Price</li>
                     <li>Availabity</li>
                </ul>
            )
        })
    }
    return (
        <Fragment>
          <div className="each-variation">
                    <span className="each-variation-title">{variation}</span>
                    <div className="each-variation-table">
                        <ul className="each-variation-table-header each-variation-table-items">
                            <li>Option</li>
                            <li>Supplier Price</li>
                            <li>Markup</li>
                            <li>Selling Price</li>
                            <li>Availabity</li>
                        </ul>
                        { mapOptions }
                    </div>
                </div>
        </Fragment>
    )
}
