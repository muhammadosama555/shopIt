import React, { useEffect } from 'react'
import Product from './product/Product'
import Loader from './layout/Loader'
import Hero from './layout/Hero'
import Bundles from './layout/Bundles'
import Reviews from './layout/Reviews'
import Info from './layout/Info'
import Subscription from './layout/Subscription'
import { Link } from 'react-router-dom'
import { useGetProducts } from '../apiCalls/productApiCalls'



const Home = () => {

  const { isLoading: isproductsLoading, data: products } = useGetProducts()
console.log(products?.data)

  return (
    <>
   
      <>
       <Hero/>
       <section className="best-products my-5 mx-6">
    <div>
      <h1 className="text-center text-2xl font-semibold py-8">Best Selling Products</h1>
    </div>
   {isproductsLoading ? <Loader/> :
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-5 justify-center">
          {products.data.products.map((product)=>(
        <Product key={product._id} product={product} />
         ))
      }
</div>
      <div className="flex justify-center items-center md:max-w-[333px] lg:max-w-[333px] xl:max-w-[333px] pb-10 w-full">
      <Link to="/search"
          className="text-white justify-center flex text-lg font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all">EXPLORE
          ALL
          PRODUCTS</Link>
      </div>
    </div>}

  </section>

<Bundles/>
<Reviews/>
<Info/>
<Subscription/>
      </>
    
    </>
  )
}

export default Home