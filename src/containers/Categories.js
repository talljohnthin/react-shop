import React, { Component } from 'react'
import CategoryList from '../components/Category/CategoryList'
import AddCategory from '../components/Category/AddCategory'
import { db } from '../config/firebase'
export default class Categories extends Component {
    state = {
        category:'',
        categoryList: [],
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
                statusMessage: 'ADD'
            })
        } else {
            this.setState({
                statusMessage: 'ADD_ERROR'
            })
        }
    }

   handleRemoveCategory = ( id ) => {
        db.collection("category").doc(id).delete().then(function() {
           console.log('deleted')
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        this.setState({
              statusMessage: 'DELETED'
        })
   }

    render() {
        
        const isLoading = this.state.isLoading ? 
        (   <div className="loading">Loading Categories...</div> ) :
        (   <CategoryList 
            categoryList={this.state.categoryList}
            handleRemoveCategory={this.handleRemoveCategory}
            /> 
        )
        
        let status = null;
        if (this.state.statusMessage != null) {
            switch(this.state.statusMessage) {
                case 'ADD':
                  status = ( <div className="alert alert-success">New category added successfully!</div> )
                  setTimeout(()=>{
                    status = null;
                    this.setState({
                        statusMessage: null
                    })
                  },3000)
                  break;
                case 'ADD_ERROR':
                    status = ( <div className="alert alert-danger">Data is not added!</div> )
                    setTimeout(()=>{
                      status = null;
                      this.setState({
                          statusMessage: null
                      })
                    },3000)
                  break;
                case 'DELETED':
                    status = ( <div className="alert alert-success">Category is removed successfully!</div> )
                    setTimeout(()=>{
                      status = null;
                      this.setState({
                          statusMessage: null
                      })
                    },3000)
                  break;
                default:
                  // code block
            }
        }
        return (
            
            <div>
                { status != null ? status : '' }
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action active"> Category List</a>
                    { isLoading }
                </div>
               
                
                <AddCategory 
                    handleAddNewCategory={ this.handleAddNewCategory }
                /> 
            </div>
        )
    }
}
