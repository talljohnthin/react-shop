import React, { Component } from 'react'

export default class AddCategory extends Component {
    state = {
        category: ''
    }
    handleUpdateStateCategory = e => {
        e.preventDefault()
        this.setState({
            category: e.target.value
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.props.handleAddNewCategory(this.state.category)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Category Input</label>
                        <input type="text" className="form-control" name="category" value={this.state.category} onChange={this.handleUpdateStateCategory}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
