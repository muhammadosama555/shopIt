import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = () => {

const {products,shippingInfo} = useSelector((state)=>state.cartSlice)
const {currentUser} = useSelector((state)=>state.userSlice)

// calculate order prices
const itemsPrice = products.reduce((acc,item)=>acc + item.price * item.quantity, 0)
const shippingPrice = itemsPrice > 200 ? 0 : 25
const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

  return (
    <>
    <MetaData title={"confirm order"} />
    <CheckoutSteps shipping="shipping" confirmOrder="confirmOrder"/>
    <div className="cart items-center flex justify-center lg:flex xl:flex lg:justify-center xl:justify-center">
        <div className="wrapper w-full my-20 shadow-lg mx-6 sm:max-w-xl md:max-w-[700px] lg:max-w-[960px] xl:max-w-[960px]">
            <h2 className="px-8 py-8 text-2xl">Shipping Info</h2>
            <div className="pl-12">
                <p><b>Name:</b>{currentUser.user && currentUser.user.name}</p>
                <p><b>Phone:</b>{shippingInfo.phoneNo}</p>
                <p><b>Address:</b>{`${shippingInfo.address},${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`}</p>
            </div>
            <h2 className="px-8 py-8 text-2xl">Your Cart Items:</h2>
            <div className="cart-content flex flex-col lg:flex-row xl:flex-row lg:justify-between xl:justify-between gap-10 pb-10">
            {products.map(item=>(
                    <>
               <div className="product flex flex-col gap-5 px-8">
                    <div>
                        <img className="rounded-md" src={item.images[0].url} alt="" height="100" width="100"/>
                    </div>
                    <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="price text-lg font-semibold text-black">
                    <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                    </div>
                    
                </div>
                    </>
                ))}
                
                <div className="summary lg:w-2/5 xl:w-2/5">
                    <div className="px-8">
                        <div className="border flex flex-col gap-5 shadow-lg border-[#e3e3e3] px-5 py-3 rounded-md ">
                            <h4 className="text-2xl mt-3">Order Summary</h4>
                            <hr/>
                            <p>Subtotal:  <span class="float-right font-semibold">${itemsPrice}</span></p>
                            <p>Shipping: <span class="float-right font-semibold">${shippingPrice}</span></p>
                            <p>Tax: <span class="float-right font-semibold">${taxPrice}</span></p>
                            <hr/>
                            <p>Total: <span class="float-right font-semibold">${totalPrice}</span></p>
                            <div className="flex justify-center mt-5 pb-3">
                                <button className="text-white font-semibold bg-[#e79703] w-full py-3 rounded-md hover:bg-[#d87803] hover:transition-all" id="login_button" type="submit">
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    {/* <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b>{currentUser.user && currentUser.user.name}</p>
                <p><b>Phone:</b>{shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b>{`${shippingInfo.address},${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`}</p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
                {products.map(item=>(
                    <>
                    <hr />
                <div className="cart-item my-1" key={item.product}>
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.images[0].url} alt="Laptop" height="45" width="65"/>
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                        </div>

                    </div>
                </div>
                <hr />
                    </>
                ))}
                

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div> */}
    </>
  )
}

export default ConfirmOrder