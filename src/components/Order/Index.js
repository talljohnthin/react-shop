import React, { Fragment, useState, useEffect } from 'react'
import { ListGroup, Form, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faListOl, faSearch } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { getOrders, getOrdersByCustomer, selectOrder } from './../../redux/actions/order/orderActions'
import { formatOrderDate, Spinner } from './../../utils/Index'
import  { Redirect } from 'react-router-dom'

const Index = ({ stateOrders, getOrders, getOrdersByCustomer, selectOrder }) => {
    let isMounted = false
    const [ selectionOrder, setSelectionOrder ] = useState('To Review')
    const [ customerId, setCustomerId ] = useState('')
    const [redirect, setRedirect] = useState(false)
    useEffect(()=>{
        isMounted = true
        if(stateOrders.length === 0) {
            getOrders('On Review')
        }
        return () => {
            isMounted = false
        }
    }, [])

    const handleCheckOrder = id => {
        if(id) {
            selectOrder(id)
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Redirect to='/Order/ViewOrder'  />
    }

    const onRadioChange = (e) => {
        setSelectionOrder(e.target.value)
        switch(e.target.value) {
            case 'To Review':
                getOrders('On Review')
              break;
            case 'To Proccess':
                getOrders('On Ship')
              break;
            case 'Completed':
                getOrders('Received')
                break;
            default:
              return
        }
    }

    const handleSearchOrderByCustomer = () => {
        switch(selectionOrder) {
            case 'To Review':
                getOrdersByCustomer('On Review', customerId)
              break;
            case 'To Proccess':
                getOrdersByCustomer('On Ship', customerId)
              break;
            case 'Completed':
                getOrdersByCustomer('Received', customerId)
                break;
            default:
              return
        }
    }

    const listOfOrders = stateOrders.length < 1 ? 
    <Spinner/> : 
    stateOrders.map((e,i) => {
         const orderDate = formatOrderDate(e.name.order_date)
        return <ListGroup.Item as="li" 
                key={i} 
                onClick={ ()=> handleCheckOrder(e.id) }> 
                    { orderDate } 
                    <FontAwesomeIcon icon={faArrowRight}
                    style={{float:'right', cursor:'pointer'}}/>
            </ListGroup.Item>
    })
    return (
        <Fragment>
            <Container style={container}>
                <div style={{marginBottom:15, display:'flex', alignItems:'center'}}>
                    <input type="text" className="form-control" placeholder="Customer ID" value={customerId} onChange={e => setCustomerId(e.currentTarget.value)} />
                    <Button style={{marginLeft:6, height:35}} onClick={()=> handleSearchOrderByCustomer() }> <FontAwesomeIcon icon={faSearch}
                    style={{float:'right', cursor:'pointer'}}/></Button>
                </div>
                <Form style={formRadio}>
                    <div className="radio" >
                        <label>
                            <input type="radio" 
                                value="To Review" 
                                checked={selectionOrder === 'To Review'}
                                onChange={onRadioChange}
                            />
                            To Review
                        </label>
                    </div>
                    <div className="radio" style={{paddingLeft:10,paddingRight:10}}>
                        <label>
                            <input type="radio" 
                                value="To Proccess" 
                                checked={selectionOrder === 'To Proccess'} 
                                onChange={onRadioChange}/>
                            To Proccess
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" 
                            value="Completed" 
                            checked={selectionOrder === 'Completed'} 
                            onChange={onRadioChange}/>
                            Completed
                        </label>
                    </div>
                </Form>
                <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                            <FontAwesomeIcon icon={faListOl} /> List of Orders
                    </ListGroup.Item>
                    { listOfOrders }
                </ListGroup>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    stateOrders :state.orders.orders
})

const mapDispatchToProps = { getOrders, getOrdersByCustomer, selectOrder }
export default connect(mapStateToProps, mapDispatchToProps)(Index)

const container = {
    maxWidth: '600px',
    marginTop: '60px'
}
const formRadio = {
    display:'flex',
    justifyContent:'row',
    paddingBottom:15
}