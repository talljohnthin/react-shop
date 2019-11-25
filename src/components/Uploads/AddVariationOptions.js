import React, { Fragment } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function AddVariationOptions(props) {
    console.log(props.variationOptions)
    return (
        <Fragment> 
            <ul className="variation-list">
                {props.variationOptions.map((option, index) => <li  key={option || 0 } ><FormControl onChange={ e => props.handleAddVariationOptionValue(e, index) }/>
                    <FontAwesomeIcon icon={faTrash} onClick={ () => props.handleRemoveVariationOption(index) }/>
                </li>)}
            </ul>
            <button className="btn btn-primary"  onClick={e => props.handleAddVariationOption() }>Add Options</button>
        </Fragment>
    )
}
