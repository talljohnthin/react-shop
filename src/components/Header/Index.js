import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap'
import './Sass/Style.scss'

export default class Index extends Component {
    render() {
        return (
            <Fragment>
                <div className="header">
                    <Container>
                        <div className="left">
                            <span>JUST 10</span>
                        </div>
                        <div className="right">
                            <FontAwesomeIcon icon={faCartArrowDown} />
                        </div>
                    </Container>
                </div>
            </Fragment>
        )
    }
}
