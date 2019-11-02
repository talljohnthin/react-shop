import React, { Component, Fragment } from 'react'
import { Button, FormControl } from 'react-bootstrap'

export default class AddVariations extends Component {
    state = {
        variationsValue: [],
        variations: ['variation-0']
    }
    addVariations = e => {
        const variation = `variation-${this.state.variations.length}`;
        this.setState(prevState => ({ 
            variations: prevState.variations.concat([variation]) 
        }));
    }
    addVariationValue = (e, index) => {
        // const value = e.target.value
        // const variationValueCopy = [...this.state.variationsValue, ]
        // console.log(value + " : " + index)
        // this.setState({
        //     variationsValue: prevState.variationsValue[index].concat([value])
        // })
    }
    render() {
        console.log(this.state.variationsValue)
        return (
            <Fragment> 
                <div id="variationInputs">
                    {this.state.variations.map(variation => <FormControl key={variation} value={this.state.variationsValue[variation]} onChange={ e => this.addVariationValue(e, variation) }/>)}
                </div>
                <button onClick={this.addVariations}>Add Variations</button>
            </Fragment>
        )
    }
}
