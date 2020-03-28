import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faClipboardList, faPenSquare, faListAlt } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    return <Fragment>
            <div className="MainSidebar">
                <div class="sidebar--title">Menu</div>
                <ul>
                    <li><Link to="/order"><FontAwesomeIcon icon={faClipboardList} className="listIcon"/>List Of Orders</Link></li>
                    <li><Link to="/upload"> <FontAwesomeIcon icon={faPlusSquare} className="listIcon"/>Add Products</Link></li>
                    <li><Link to="/update"> <FontAwesomeIcon icon={faPenSquare} className="listIcon"/>Update Products</Link></li>
                    <li><Link to="/category"> <FontAwesomeIcon icon={faListAlt} className="listIcon"/>Categories</Link></li>
                    <li><Link to="/segments"> <FontAwesomeIcon icon={faPenSquare} className="listIcon"/>Segments</Link></li>
                </ul>
            </div>
    </Fragment>
}

export default withRouter(Sidebar)