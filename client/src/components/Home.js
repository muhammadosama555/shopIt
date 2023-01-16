import React, { useEffect, useState } from 'react'
import { getProducts } from '../reducers/apiCalls'
import MetaData from './layout/MetaData'
import {useDispatch, useSelector} from "react-redux"
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'

const Home = () => {

  const {products} = useSelector((state)=>state.product.products)
  const {isFetching,error,productsCount,resPerPage} = useSelector((state)=>state.product)
  console.log(resPerPage.count);

  const [currentPage,setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  const alert = useAlert()

  useEffect(()=>{
    getProducts(dispatch,currentPage)
    if (error) {
      return alert.error("MY ERROR")
    }
  },[dispatch,alert,error,currentPage])

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
    {isFetching ? <Loader /> : (
      <>
       <MetaData title={"Buy best produts online"} />
    <h1 id="products_heading">Latest Products</h1>
   <section id="products" className="container mt-5">
   <div className="row">
    {products && products.map((product)=>(
      <Product key={product._id} product={product} />
    ))}
    
  </div>
</section>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage.count}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
      </>
    )}
    </>
  )
}

export default Home