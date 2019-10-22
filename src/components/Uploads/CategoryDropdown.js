import React, { Fragment } from 'react'

export default function CategoryDropdown(props) {
    const categories = props.categories
    const populateDropdownCategory = (categories) => {
        if (categories) {
            return categories.map(category => <option key={category.id} value={category.name.name}>{category.name.name}</option>)
        }
    }
    return (
        <Fragment>
            <select>
                { categories ? populateDropdownCategory(categories) : ( <option value="no data">No Data at this moment</option> ) }
            </select>
        </Fragment>
    )
}
