import React, {Fragment} from 'react'
import {FormControl, Form} from 'react-bootstrap'

export default function PriceSettings ({variationsValue, variation, variationIndex, variationOptions, setPrice, setAvailability, priceOptions}) {
    let mapOptions = null
    const handleSetPrice = (variationIndex, index, value) => {
        setPrice(variationIndex, index, value)
    }
    const handleSetAvailability = (variationIndex, index, value) => {
        setAvailability(variationIndex, index, value)
    }
    if (variationOptions && variationsValue) {

        mapOptions = variationOptions.map( (o,i) => {
            
            const price = priceOptions[variationIndex].options[i].price,
                status = priceOptions[variationIndex].options[i].is_available
            return (
                <ul key={o.optionIndex} className="each-variation-table-items edit-component">
                     <li>{ o.option }</li>
                     <li><FormControl value= { price || '' } onChange={(e) => handleSetPrice(variationIndex, o.optionIndex, e.target.value)}></FormControl></li>
                     <li>
                     <Form.Control as="select" value={ status || '' } onChange={(e) => handleSetAvailability(variationIndex, o.optionIndex, e.target.value)}>
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
