import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import firebase from './../config/firebase'
import { AuthContext } from './../contexts/AuthContext'
import './../styles/variables.scss';

const selected = {
    backgroundColor:'#00807d'
}

const Sidebar = () => {
    const [current, setCurrent] = useState(1)
    return <Fragment>
            <div className="MainSidebar">
            <AuthContext.Consumer>
                {(value) => {           
                    if ( value.state.user === null || Object.keys(value.state.user).length === 0 ) {
                        return  <div className="user-profile">
                            <div className="user-initial">G</div>
                            <div className="user-name">Guess</div>
                        </div>
                    } else {
                        return  (
                        <Fragment> 
                            <div className="user-profile">
                                <div className="user-initial">{value.state.user.user.displayName.slice(0,1)}</div>
                                <div className="user-name">{value.state.user.user.displayName}</div>
                            </div>
                            <ul>
                                <li><Link style={ current === 1 ? selected : null}  onClick={()=> setCurrent(1)} to="/order"><ion-icon name="cart-outline" style={{fontSize:18}}></ion-icon> List Of Orders</Link></li>
                                <li><Link style={ current === 3 ? selected : null}  onClick={()=> setCurrent(3)} to="/update"> <ion-icon name="create-outline" style={{fontSize:18}}></ion-icon> Update Products</Link></li>
                                <li><Link style={ current === 2 ? selected : null}  onClick={()=> setCurrent(2)} to="/upload"><ion-icon name="add-circle-outline" style={{fontSize:18}}></ion-icon> Add Product</Link></li>
                                <li><Link style={ current === 4 ? selected : null}  onClick={()=> setCurrent(4)} to="/category"><ion-icon name="duplicate-outline"></ion-icon> Categories</Link></li>
                                <li><Link style={ current === 5 ? selected : null}  onClick={()=> setCurrent(5)} to="/segments"><ion-icon name="layers-outline"></ion-icon> Segments</Link></li>
                            </ul>
                        </Fragment>)
                    }
                }}
            </AuthContext.Consumer>
                
            </div>
    </Fragment>
}

export default withRouter(Sidebar)