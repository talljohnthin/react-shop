import React, { Fragment, useContext} from 'react'
import firebase from '../../config/firebase'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/AuthContext'
import { WishListContext} from './../../contexts/WishListContext'
import './Sass/Style.scss'

const Index = () => {
    const {dispatch} = useContext(AuthContext)
    const {wishListState} = useContext(WishListContext)
    const handleLogout = () => {
        dispatch({type: "LOGOUT", payload:null})
        firebase.auth().signOut()
    }
    let wishListCount = null
    if ( wishListState) {
        wishListCount = wishListState.products.length <= 0 ? {opacity:0} : {opacity:1};
    }
    return (
        <Fragment>
            <div className="header">
                <Container>
                    <div className="left">
                        <span>JUST 10</span>
                    </div>
                    <div className="right">
                        <div className="wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" width="1000mm" height="1000mm" viewBox="0 0 1000 1000" style={{
                                maxWidth: '1.6em',
                                height: 'auto'
                            }} data-livestyle-extension="available">

                                <path id="path" style={{ style }} d=" M 300 172C 250 172 203 192 167 227C 132 262 113 310 113 360C 113 360 113 360 113 360C 113 360 113 360 113 360C 113 409 132 457 168 492C 168 492 168 492 168 492C 168 492 459 805 459 805C 476 821 489 828 500 828C 510 828 523 821 541 805C 541 805 827 498 827 498C 827 498 836 507 836 507C 834 504 832 501 832 498C 832 494 833 491 836 489C 869 454 887 408 888 360C 887 310 868 262 833 227C 797 192 750 172 700 172C 650 172 603 192 568 227C 553 243 542 256 532 265C 522 274 512 281 500 281C 488 281 478 274 468 265C 458 256 447 243 432 227C 397 192 350 172 300 172C 300 172 300 172 300 172M 300 147C 356 147 410 170 450 209C 450 210 451 210 451 210C 465 227 476 239 485 246C 493 254 497 256 500 256C 503 256 507 254 515 246C 524 239 535 227 549 210C 549 210 550 210 550 209C 590 170 644 147 700 147C 756 147 810 170 850 209C 890 249 912 303 913 360C 913 360 913 360 913 360C 912 413 892 465 856 504C 855 505 855 505 854 506C 854 506 559 822 559 822C 559 822 559 823 559 823C 538 842 520 853 500 853C 479 853 461 841 441 823C 441 823 441 822 441 822C 441 822 150 510 150 510C 150 510 150 510 150 510C 110 470 88 416 88 360C 87 360 87 360 88 360C 88 303 110 249 150 209C 190 170 244 147 300 147C 300 147 300 147 300 147" transform="">
                                </path>
                            </svg>
                            <div className="wishlist-count" style={ wishListCount }>
                                {  wishListState.products.length }
                            </div>
                        </div>
                        <div className="orders">
                            <svg style={{
                                maxWidth: '1.6em',
                                height: 'auto'
                            }} role="img" role="img" width="1000mm" height="1000mm" viewBox="0 0 1000 1000">
                                <path id="path" style={style} d=" M 925 175C 932 175 938 181 938 188C 938 194 932 200 925 200C 925 200 861 200 861 200C 861 200 787 640 787 640C 786 646 781 650 775 650C 775 650 200 650 200 650C 193 650 187 644 187 638C 187 631 193 625 200 625C 200 625 764 625 764 625C 764 625 838 185 838 185C 839 179 844 175 850 175C 850 175 925 175 925 175M 750 225C 758 225 764 232 762 240C 762 240 712 540 712 540C 711 546 706 550 700 550C 700 550 175 550 175 550C 170 550 165 547 163 541C 163 541 63 241 63 241C 60 233 66 225 75 225C 75 225 750 225 750 225M 184 525C 184 525 689 525 689 525C 689 525 735 250 735 250C 735 250 92 250 92 250C 92 250 184 525 184 525M 337 788C 337 836 298 875 250 875C 202 875 163 836 163 788C 163 739 202 700 250 700C 298 700 337 739 337 788C 337 788 337 788 337 788M 788 788C 788 836 748 875 700 875C 652 875 613 836 613 788C 613 739 652 700 700 700C 748 700 788 739 788 788C 788 788 788 788 788 788M 188 788C 188 822 215 850 250 850C 285 850 312 822 312 788C 312 753 285 725 250 725C 215 725 188 753 188 788C 188 788 188 788 188 788M 638 788C 638 822 665 850 700 850C 735 850 763 822 763 788C 763 753 735 725 700 725C 665 725 638 753 638 788C 638 788 638 788 638 788" transform="translate(1000,0) scale(-1,1) ">
                                </path>
                            </svg>
                            <div className="orders-count">2</div>
                        </div>
                        <div className="user-login">
                            <AuthContext.Consumer>
                                {(value) => {
                                    if ( value.state.user === null ) {
                                        return <Link to="/login"><div className="user-button">Login</div></Link>
                                    } else {
                                        return  <Fragment>
                                                    <div className="user-name">{firebase.auth().currentUser && firebase.auth().currentUser.displayName}</div>
                                                    <div className="user-button" onClick={handleLogout}>Logout</div>
                                                </Fragment>
                                    }
                                }}
                            </AuthContext.Consumer>
                        </div>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

export default Index;

const style = {
    opacity: 1,
    vectorEffect: 'none',
    fill: '#000000',
    fillOpacity: 1
}