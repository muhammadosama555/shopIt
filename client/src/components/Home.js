import React, { useEffect, useState } from 'react'
import { getProducts } from '../reducers/apiCalls'
import MetaData from './layout/MetaData'
import {useDispatch, useSelector} from "react-redux"
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Hero from './layout/Hero'
import Bundles from './layout/Bundles'
import Reviews from './layout/Reviews'
import Info from './layout/Info'
import Subscription from './layout/Subscription'
import { Link } from 'react-router-dom'



const Home = () => {

  const {productsData,isFetching,error} = useSelector((state)=>state.productSlice)

  const dispatch = useDispatch()
  const alert = useAlert()


  useEffect(()=>{
    console.log("hit");
    getProducts(dispatch)
    if (error) {
     alert.error("MY ERROR")
    }

  },[dispatch,alert,error])
console.log(error);

  return (
    <>
    {isFetching ? <Loader /> : (
      <>
       <MetaData title={"Buy best produts online"} />
       <Hero/>
       <section class="best-products my-5 mx-6">
    <div>
      <h1 class="text-center text-2xl font-semibold py-8">Best Selling Products</h1>
    </div>
    <div class="flex flex-col items-center gap-8">
      <div class="flex flex-wrap gap-5 justify-center">
          { productsData.products && productsData.products.map((product)=>(
        <Product key={product._id} product={product} />
         ))
      }
</div>
      <div class="flex justify-center items-center md:max-w-[333px] lg:max-w-[333px] xl:max-w-[333px] pb-10 w-full">
        <button
          class="text-white text-lg font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"><Link to="/search">EXPLORE
          ALL
          PRODUCTS</Link></button>
      </div>
    </div>
  </section>

<Bundles/>
<Reviews/>
<Info/>
<Subscription/>
      </>
    )}
    </>
  )
}

export default Home