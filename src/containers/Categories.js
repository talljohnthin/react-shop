import React, { Component } from 'react'
import CategoryList from '../components/Category/CategoryList'
import AddCategory from '../components/Category/AddCategory'
import { db } from '../config/firebase'
export default class Categories extends Component {
    state = {
        category:'',
        isCategoryValid:false,
        categoryList: [],
        isLoading:false,
        statusMessage: null
    }

    componentDidMount() {
        this.setState({isLoading:true})
        db.collection("category")
        .onSnapshot(snapshot => {
            const categoryList = []
            snapshot.forEach( doc => {
                const dataObj = {
                   id: doc.id,
                   name: doc.data()
                }
                categoryList.push(dataObj)
               
            })
            this.setState({
                categoryList,
                isLoading: false
            })
        })
    }

    handleAddValidity = () => {
        let status = null;
        if ( !this.state.isCategoryValid ) {
            status = '<div className="alert alert-success">Sucessfully added!</div>'
        } else {
            status = '<div className="alert alert-danger">Minimum of 3 characters.</div>'
        }
        this.setState({
            statusMessage : status
        })

        setTimeout(() => {
            console.log(this.statusMessage)
            this.setState({
                statusMessage : null
            })
        }, 3000)
    }

    handleAddNewCategory = (newCategory) => {
        if (newCategory.length > 3) {
            db.collection("category").add({
                name: newCategory
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            this.setState({
                isCategoryValid:true
            })
        } else {
            this.setState({
                isCategoryValid:false
            })
        }
        this.handleAddValidity()
    }

   handleRemoveCategory = ( id ) => {
       db.collection("category").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
   }

    render() {
        
        const isLoading = this.state.isLoading ? 
        (   <div className="loading">Loading Categories...</div> ) :
        (   <CategoryList 
            categoryList={this.state.categoryList}
            handleRemoveCategory={this.handleRemoveCategory}
            /> 
        )

        return (
            <div>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action active"> Category List</a>
                    { isLoading }
                </div>
               
                { this.statusMessage }
                <AddCategory 
                    handleAddNewCategory={ this.handleAddNewCategory }
                /> 
            </div>
        )
    }
}
