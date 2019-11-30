import React, {Fragment} from 'react'
import {FormControl, Form} from 'react-bootstrap'

export default function PriceSettings ({variation, variationIndex, variationOptions, setPrice, setAvailability}) {
    let mapOptions = null
    const handleSetPrice = (variationIndex, index, value) => {
        setPrice(variationIndex, index, value)
    }
    const handleSetAvailability = (variationIndex, index, value) => {
        setAvailability(variationIndex, index, value)
    }
    if (variationOptions) {
        mapOptions = variationOptions.map( (o,i) => {
            return (
                <ul key={o.optionIndex} className="each-variation-table-items">
                     <li>{ o.option }</li>
                     <li><FormControl onChange={(e) => handleSetPrice(variationIndex, o.optionIndex, e.target.value)}></FormControl></li>
                     <li>
                     <Form.Control as="select" onChange={(e) => handleSetAvailability(variationIndex, o.optionIndex, e.target.value)}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Form.Control>
                     </li>
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
                            <li>Selling Price</li>
                            <li>Availabity</li>
                        </ul>
                        { mapOptions }
                    </div>
                </div>
        </Fragment>
    )
}
