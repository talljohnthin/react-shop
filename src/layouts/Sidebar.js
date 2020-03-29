import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faClipboardList, faPenSquare, faListAlt } from '@fortawesome/free-solid-svg-icons'

import './../styles/variables.scss';

const selected = {
    backgroundColor:'#00807d'
}

const Sidebar = () => {
    const [current, setCurrent] = useState(1)
    return <Fragment>
            <div className="MainSidebar">
                <ul>
                    <li><Link style={ current === 1 ? selected : null}  onClick={()=> setCurrent(1)} to="/order"><FontAwesomeIcon icon={faClipboardList} className="listIcon"/>List Of Orders</Link></li>
                    <li><Link style={ current === 2 ? selected : null}  onClick={()=> setCurrent(2)} to="/upload"> <FontAwesomeIcon icon={faPlusSquare} className="listIcon"/>Add Product</Link></li>
                    <li><Link style={ current === 3 ? selected : null}  onClick={()=> setCurrent(3)} to="/update"> <FontAwesomeIcon icon={faPenSquare} className="listIcon"/>Update Products</Link></li>
                    <li><Link style={ current === 4 ? selected : null}  onClick={()=> setCurrent(4)} to="/category"> <FontAwesomeIcon icon={faListAlt} className="listIcon"/>Categories</Link></li>
                    <li><Link style={ current === 5 ? selected : null}  onClick={()=> setCurrent(5)} to="/segments"> <FontAwesomeIcon icon={faPenSquare} className="listIcon"/>Segments</Link></li>
                </ul>
            </div>
    </Fragment>
}

export default withRouter(Sidebar)