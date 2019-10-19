import React, { Component } from 'react'
import List from './List'
import Add from './Add'
import { db } from '../../config/firebase'
import Alert from '../Alert/Index'


export default class Index extends Component {
    state = {
        categories: [],
        alertMessage: null,
        showAlert:false,
        alertType:'success'
    }

    alertTimeout = null


    componentDidMount() {
        db.collection("category")
        .onSnapshot(snapshot => {
            const categories = []
            snapshot.forEach( doc => {
                const obj = {
                    id : doc.id,
                    name : doc.data()
                }
                categories.push(obj)
            })
            this.setState({categories})
        });
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
            const alertObj = {
                type: 'success',
                message: 'New Category Added Successfuly!'
            }
            if(this.alertTimeout) {
                clearTimeout(this.alertTimeout)
                this.setState({
                    showAlert:false
                }, () => {
                    this.alertTimeout = setTimeout(()=>{
                       this.handleShowAlert(alertObj)
                    },250)  
                })
            } else {
                this.handleShowAlert(alertObj)
            }
        } else {
            const alertObj = {
                type: 'failed',
                message: 'Character must be greater than 3.'
            }
            if(this.alertTimeout) {
                clearTimeout(this.alertTimeout)
                this.setState({
                    showAlert:false
                }, () => {
                    this.alertTimeout = setTimeout(()=>{
                       this.handleShowAlert(alertObj)
                    },250)  
                })
            } else {
                this.handleShowAlert(alertObj)
            }
        }
    }
    handleShowAlert = ({message, type}) => {
        this.setState({
            showAlert:true,
            alertMessage: message,
            alertType: type
        }, () => {
            this.alertTimeout = setTimeout(()=>{
                this.setState({
                    showAlert:false,
                })
            },3000)
        })
    }
    handleRemoveCategory = ( id ) => {
        db.collection("category").doc(id).delete().then(function() {
           console.log('deleted')
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        const alertObj = {
            type: 'success',
            message: 'Category Deleted Successfuly!'
        }
        if(this.alertTimeout) {
            clearTimeout(this.alertTimeout)
            this.setState({
                showAlert:false
            }, () => {
                this.alertTimeout = setTimeout(()=>{
                   this.handleShowAlert(alertObj)
                },250)  
            })
        } else {
            this.handleShowAlert(alertObj)
        }
   }

    render() {
        
        const isLoading = this.state.isLoading ? 
        (   <div className="loading">Loading Categories...</div> ) :
        (   <List 
            categoryList={this.state.categories}
            handleRemoveCategory={this.handleRemoveCategory}
            /> 
        )
        
        return (
            
            <div>
                {/* show alert*/}
                <Alert 
                showAlert={this.state.showAlert} 
                type={this.state.alertType}
                message={this.state.alertMessage}
                />

                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action active"> Category List</a>
                    { isLoading }
                </div>
               
                
                <Add
                    handleAddNewCategory={ this.handleAddNewCategory }
                /> 
            </div>
        )
    }
}
