import React, { Fragment } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function UpdateVariationOptions(props) {
    return (
        <Fragment> 
            <div className="option-title">Fields of options:</div>
            <ul className="variation-list">
                {props.variationOptions.map((option, index) => <li  key={option || 0 } ><FormControl onChange={ e => props.handleAddVariationOptionValue(e, index) }/>
                    <FontAwesomeIcon icon={faTrash} onClick={ () => props.handleRemoveVariationOption(index) }/>
                </li>)}
            </ul>
            <Button onClick={e => props.handleAddVariationOption() }><ion-icon name="add"></ion-icon> Create Price Options</Button>
        </Fragment>
    )
}
