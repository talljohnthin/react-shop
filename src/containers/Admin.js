import React, { Fragment } from 'react'
import Sidebar from '../layouts/Sidebar'
import Header from '../components/Header/Index'
import ReactNotifications from 'react-notifications-component';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from '../components/Auth/SignUp';
import Login from '../components/Auth/Login'
import Products from '../components/Product/Products'
import Category from '../components/Category/Index'
import Segments from '../components/Segments/Index'
import Uploads from '../components/Uploads/Index'
import Hero from '../components/Hero/Index'
import Update from '../components/Update/Index'
import Edit from '../components/Edit/Index'
import WishList from '../components/WishList/Index'
import Order from '../components/Order/Index'
import ViewOrder from '../components/Order/ViewOrder'

const Admin = () => {
    return <Fragment>
        <Router>
            <div className="AppWrapper">
                <Sidebar />
                <Header />
                <div className="MainContent">
                    <ReactNotifications />
                    {/* <Route path="/" exact component={ Hero }/>
                    <Route path="/" exact component={ Products }/> */}
                    <Route path="/order" exact component={ Order } />
                    <Route path="/upload" exact component={ Uploads } />
                    <Route path="/order/ViewOrder" exact component={ ViewOrder } />
                    <Route path="/update" exact component={ Update } />
                    <Route path="/edit/:id" exact component={ Edit } />
                    {/* <Route path="/signup" exact component={ SignUp }/>
                    <Route path="/login" exact component={ Login }/>
                    <Route path="/wish-list" exact component={ WishList }/> */}
                    <Route path="/category" exact component={ Category }/>
                    <Route path="/segments" exact component={ Segments } />
                </div>
            </div>
        </Router>
    </Fragment>
}
export default Admin