import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userShippingInfo } from '../../reducers/apiCalls'
import MetaData from '../layout/MetaData'
import {countries} from 'countries-list'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'

const Shipping = () => {

const countriesList = Object.values(countries)
    
const {shippingInfo} = useSelector(state=>state.cartSlice)

const [address,setAddress] = useState(shippingInfo.address)
const [city,setCity] = useState(shippingInfo.city)
const [postalCode,setPostalCode] = useState(shippingInfo.postalCode)
const [phoneNo,setPhoneNo] = useState(shippingInfo.phoneNo)
const [country,setCountry] = useState(shippingInfo.country)
const dispatch = useDispatch()
const Navigate = useNavigate()

const submitHandler = (e) => {
    e.preventDefault()
    const info = {address,city,postalCode,phoneNo,country}
    userShippingInfo(dispatch,info)
    Navigate('/order/confirm')
}
//console.log(shippingInfo)

  return (
    <>
    <MetaData title={"shipping Info"} />
    <CheckoutSteps shipping="shipping"/>
    <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                defaultValue={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                defaultValue={city}
                                onChange={(e)=>setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                defaultValue={phoneNo}
                                onChange={(e)=>setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                defaultValue={postalCode}
                                onChange={(e)=>setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                defaultValue={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map((country)=>(
                                    <option key={country.name} value={country.name}>
                                    {country.name}
                                    </option>
                                ))}
                                    

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default Shipping