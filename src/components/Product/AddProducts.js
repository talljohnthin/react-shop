import React, { Component } from 'react'
import { db } from '../../config/firebase'

export default class AddProducts extends Component {
    state = {
        category: '',
        description: '',
        images: [
            {
                status: true,
                url : 'https://picsum.photos/600/400'
            },
            {
                status: true,
                url : 'https://picsum.photos/600/400'
            },
            {
                status: true,
                url : 'https://picsum.photos/600/400'
            }
        ]
    }
    handleChangeValue = e => {
        e.preventDefault()
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleAddProducts = e => {
        db.collection("users").add({
            first: "Johnrel",
            last: "Limpag",
            phone: '090909',
            role: 'user',
            username: 'asdf',
            pass:'asdf'
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    }

    componentDidMount() {
        db.collection('set')
          .get()
          .then( snapshot => {
            const item = [];
            snapshot.forEach( doc => {
                let data = doc.data()
                item.push(data)
            })
            console.log(item)
          })
          .catch( error => console.log( error ))
    }
   
    render() {
        console.log(this.state)
        return (
            <div>
               <form onSubmit={ this.handleAddProducts }>
                <div className="form-group">
                    <input type="file" className="form-control-file" id="images" name="product-images" />
                </div>
                <div className="form-group">
                    <select name="category" value={ this.state.category } onChange={ this.handleChangeValue }>
                    <option value="tops">Tops</option>
                    <option value="shorts">Shorts</option>
                    <option value="couple">Couple</option>
                    <option value="kids">Kids</option>
                    <option value="shoes">Shoes</option>
                    <option value="bag">Bag</option>
                    <option value="watches">Watches</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea name="description" value={ this.state.description } onChange={ this.handleChangeValue } />
                </div>
                <div className="form-group">
                    <button type="submit">Add Products</button>
                </div>
                </form>
            </div>
        )
    }
}
