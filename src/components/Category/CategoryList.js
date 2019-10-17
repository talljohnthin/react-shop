import React, {Fragment, Component} from 'react'

export default class CategoryList extends Component {

    removeCategory( id ) {
        this.props.handleRemoveCategory( id )
    }
    render() {
        const list = this.props.categoryList.map( doc => {
            return (<li key={doc.id} className="list-group-item list-group-item-action"> {doc.name.name} 
                <button className="btn btn-danger" onClick={() => this.removeCategory( doc.id )}>remove</button>
            </li>)
        })
        return (
            <Fragment>
            {list}
            </Fragment>
        )
    }
}
