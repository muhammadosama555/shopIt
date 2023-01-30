import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../reducers/cartReducers'
import { updateQuantity } from '../../reducers/apiCalls'


const Cart = () => {

const {products} = useSelector((state)=>state.cartSlice)
console.log(products);
const dispatch = useDispatch()
const Navigate = useNavigate()

const checkoutHandler = () => {
    Navigate('/login?redirect=shipping')
}
console.log(Navigate);
  return (
    <>
    {products.length === 0 ? <h2 classNameName='mt-5'>Your cart is empty</h2> : (
        <>
        <MetaData title={'Your Cart'} />
        <h2 className="mt-5">Your Cart: <b>{products.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                <hr />
                {products.map((item) =>(
                      <div className="cart-item" key={item._id}>
                      <div className="row">
                          <div className="col-4 col-lg-3">
                              <img src={item.images[0].url} alt="Laptop" height="90" width="115"/>
                          </div>
  
                          <div className="col-5 col-lg-3">
                              <Link to={`/products/${item.product}`}>{item.name}</Link>
                          </div>
  
  
                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                              <p id="card_item_price">{item.price}</p>
                          </div>
  
                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                              <div className="stockCounter d-inline">
                                  <span className="btn btn-danger minus" onClick={()=>dispatch(decreaseQuantity(item._id))}>-</span>
                                  <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                  <span className="btn btn-primary plus" onClick={()=>dispatch(increaseQuantity(item._id))}>+</span>
                              </div>
                          </div>
  
                          <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                              <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>dispatch(removeFromCart(item._id))}></i>
                          </div>
  
                      </div>
                  </div>
                ))}
            
                <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{products.reduce((acc,item)=>(acc + Number(item.quantity)),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${products.reduce((acc,item)=>(acc + item.quantity * item.price),0)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                </div>
            </div>
        </div>
        </>
    )}
    </>
  )
}

export default Cart