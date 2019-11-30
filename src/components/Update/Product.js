import React, { Fragment, Component} from 'react'
import Switch from 'react-input-switch'
import { db} from '../../config/firebase'

export default class Product extends Component {
    state = {
       value : this.props.data.data.status === "available" ? 1 : 0
    }
    handleOnOff = (id, status)=> {
        this.setState({
            value : this.state.value === 0 ? 1 : 0
        })
        db.collection('products').doc(id).update({
           status: status == 'available' ? 'not available' : 'available'
        })
    }
    render() {
        const data = this.props.data
        const product = data.data
        return (
            <Fragment>
                <div className="card">
                    <div className="card-wrapper">
                        <div className="left">
                            <img className="card-img" src={ product.cover} alt={ product.productName } />
                        </div>
                        <div className="center">
                            <h4 className="card-title">{ product.productName }</h4>
                            <p className="card-price">Php { product.priceOptions[0].options[0].price } </p>
                        </div>
                        <div className="right">
                            <Switch 
                                value={this.state.value}
                                onChange={ () => this.handleOnOff(data.id, data.data.status)}
                                styles={{
                                    track: {
                                      backgroundColor: '#efefef'
                                    },
                                    trackChecked: {
                                      backgroundColor: '#39A7AB'
                                    },
                                    button: {
                                      backgroundColor: '#39A7AB'
                                    },
                                    buttonChecked: {
                                      backgroundColor: '#fff'
                                    }
                                  }} 
                             />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


