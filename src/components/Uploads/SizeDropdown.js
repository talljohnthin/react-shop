import React, { Fragment } from 'react'

export default function SizeDropdown(props) {
    const sizes = props.sizes
    const populateDropdownSize = (sizes) => {
        if (sizes) {
            return sizes.map(size => <option key={size.id} value={size.name.name}>{size.name.name}</option>)
        }
    }
    return (
        <Fragment>
            <select>
                { sizes ? populateDropdownSize(sizes) : ( <option value="no data">No Data at this moment</option> ) }
            </select>
        </Fragment>
    )
}
