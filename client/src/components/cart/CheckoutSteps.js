import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({shipping,confirmOrder,payment}) => {
  return (
    <>
    <div className='checkout-progress flex justify-center mt-5'>
      {shipping ? <Link to="/shipping" className='float-right'>
        <div className='triangle2-active'></div>
        <div className='step active-step'>shipping</div>
        <div className='triangle-active'></div>
      </Link> 
      : <Link to="#!" disabled>
        <div className='triangle2-incomplete'></div>
        <div className='step incomplete'>shipping</div>
        <div className='triangle-incomplete'></div>
      </Link>}
      {confirmOrder ? <Link to="/order/confirm" className='float-right'>
        <div className='triangle2-active'></div>
        <div className='step active-step'>Confirm Order</div>
        <div className='triangle-active'></div>
      </Link> 
      : <Link to="#!" disabled>
        <div className='triangle2-incomplete'></div>
        <div className='step incomplete'>Confirm Order</div>
        <div className='triangle-incomplete'></div>
      </Link>}
      {payment ? <Link to="/payment" className='float-right'>
        <div className='triangle2-active'></div>
        <div className='step active-step'>payment</div>
        <div className='triangle-active'></div>
      </Link> 
      : <Link to="#!" disabled>
        <div className='triangle2-incomplete'></div>
        <div className='step incomplete'>payment</div>
        <div className='triangle-incomplete'></div>
      </Link>}
    </div>
    </>
  )
}

export default CheckoutSteps