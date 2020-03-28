import React, { Component, Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import './Sass/Style.scss'

export default class Index extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Fragment>
                <div className="hero">
                    <Container>
                       <h1>{this.props.title}</h1>
                    </Container>
                </div>
            </Fragment>
        )
    }
}
