import React, { Fragment } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function AddVariations(props) {
    return (
        <Fragment>
            <div className="variation-title">Fields of variations:</div>
            <ul className="variation-list">
                {props.variations.map((variation, index) => <li  key={variation || 0 } ><FormControl onChange={ e => props.handleAddVariationValue(e, index) }/>
                    <FontAwesomeIcon icon={faTrash} onClick={ () => props.handleRemoveVariation(index) }/>
                </li>)}
            </ul>
            <Button onClick={e => props.handleAddVariations() }> <ion-icon name="add"></ion-icon> Create Variations</Button>
        </Fragment>
    )
}
