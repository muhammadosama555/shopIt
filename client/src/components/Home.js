import React, { useEffect, useState } from 'react'
import { getProducts } from '../reducers/apiCalls'
import MetaData from './layout/MetaData'
import {useDispatch, useSelector} from "react-redux"
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';



const Home = () => {

  const {productsData,isFetching,error} = useSelector((state)=>state.productSlice)

  const [currentPage,setCurrentPage] = useState(1)
  const [price,setPrice] = useState([1,1000])
  const [category,setCategory] = useState('')

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Food",
    "Headphones",
    "Books",
    "Clothes",
    "Sports",
    "Accessories"
  ]

  const dispatch = useDispatch()
  const alert = useAlert()

  const {keyword} = useParams();

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  useEffect(()=>{
    getProducts(dispatch,currentPage,keyword,price,category)
    if (error) {
      return alert.error("MY ERROR")
    }
    console.log(productsData);
  },[dispatch,alert,error,currentPage,keyword,price,category])

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // let count = productsData.productCount;

  // if (keyword) {
  //   count = productsData.filteredProductsCount
  // }

  return (
    <>
    {isFetching ? <Loader /> : (
      <>
       <MetaData title={"Buy best produts online"} />
    <h1 id="products_heading">Latest Products</h1>
   <section id="products" className="container mt-5">
   <div className="row">
    {keyword ?(
      <>
      <div className='col-6 col-md-3 mt-5 mb-5'>
       <div className='px-5'>
        <Range
        marks={{
          1: "$1",
          1000: "$1000"
        }} 
        min = {1}
        max = {1000}
        defaultValue = {[1,1000]}
        tipFormatter = {value => `$${value}`}
        tipProps={{
          placement: "top",
          visible: true
        }}
        value={price}
        onChange = {(price)=>setPrice(price)} 
        />

       <hr className='my-5' />

       <div className='mt-5'>
        <h4 className='mb-3'>
          Categories
        </h4>
        <ul className='pl-0'>
          {categories.map((category)=>(
           <li style={{cursor:'pointer',listStyleType:'none'}} key={category} onClick={()=> setCategory(category)}>
            {category}
           </li>
          ))}
        </ul>
       </div>

       </div>
      </div>

      <div className='col-6 col-md-9'>
        <div className='row'>
          {
        productsData.products.map((product)=>(
        <Product key={product._id} product={product} col={4}/>
         ))
      }
        </div>
      </div>
      </>
    ) 
    :(
       productsData.products.map((product)=>(
        <Product key={product._id} product={product} col={3}/>
      ))
    ) }

    
  </div>
</section>
{productsData.count <= productsData.productCount && (
  <div className="d-flex justify-content-center mt-5">
  <Pagination
    activePage={currentPage}
    itemsCountPerPage={productsData.count}
    totalItemsCount={productsData.productCount}
    onChange={setCurrentPageNo}
    nextPageText={"Next"}
    prevPageText={"Prev"}
    firstPageText={"First"}
    lastPageText={"Last"}
    itemClass="page-item"
    linkClass="page-link"
  />
</div>
)}
      
      </>
    )}
    </>
  )
}

export default Home