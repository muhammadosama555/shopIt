import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Product from '../product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../reducers/apiCalls';
import { useAlert } from 'react-alert';

const Search = () => {
  const {productsData,isFetching,error} = useSelector((state)=>state.productSlice)

  const [currentPage,setCurrentPage] = useState(1)
  const [price,setPrice] = useState([1,1000])
  const [category,setCategory] = useState('')
  const [rating,setRating] = useState(0)
  const [keyword,setKeyword] = useState("")

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

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  useEffect(()=>{
    getProducts(dispatch,currentPage,keyword,price,category,rating)
    if (error) {
      alert.error("MY ERROR")
    }

  },[dispatch,alert,error,currentPage,keyword,price,category,rating])

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


console.log(productsData.filteredproductsCount)
console.log(productsData.count);

  return (
    <>
     <div className="search-content flex">
      <div className="left w-2/12">
        <div className="filters">
          <h1 className="text-2xl text-center py-3">Filters</h1>
        </div>
      <div className='pl-6 pb-5'>
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
     </div>
        <div className="category pl-6 pb-4 border-t border-gray-200">
          <h1 className="text-xl py-3">Category</h1>
          <div className="flex flex-col gap-2 py-2">
          {categories.map((category)=>(
           <li style={{cursor:'pointer',listStyleType:'none'}} key={category} onClick={()=> setCategory(category)}>
            {category}
           </li>
          ))}
          </div>
        </div>
        <div className="rating pl-6 py-4 border-t border-b border-gray-200 flex-col">
          <h1 className="text-xl pb-3">Rating</h1>
          <ul className='pl-0'>
          {[5,4,3,2,1].map((star)=>(
           <li style={{cursor:'pointer',listStyleType:'none'}} key={star} onClick={()=> setRating(star)}>
            <div className='rating-outer'>
              <div className='rating-inner' style={{width: `${star * 20}%`}}>
              </div>
            </div>
           </li>
          ))}
        </ul>

          {/* <Rating ratingSize={'2xl'}/> */}
        </div>
        <div className="sort pl-6 py-4">
          <h1 className="text-xl py-3">Sort</h1>
          <div className="flex flex-col gap-2 py-2">
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Name (Ascending)</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Name (Descending)</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Rating (High to Low)</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Rating (Low to High)</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="right box-border pr-12 pl-4 pt-4 w-5/6">
        <div className="search-bar w-full px-20 pb-8 flex">
          <input
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Businesses"
            onChange={(e)=>setKeyword(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-5 justify-center">
          { productsData.products && productsData.products.map((product)=>(
        <Product key={product._id} product={product} />
         ))
      }
     </div>
     
    </div>
  {productsData.count <= productsData.filteredproductsCount && (
    <div className="flex justify-center my-5">
  <Pagination
    activePage={currentPage}
    itemsCountPerPage={productsData.count}
    totalItemsCount={productsData.filteredproductsCount}
    onChange={setCurrentPageNo}
    nextPageText={"Next"}
    prevPageText={"Prev"}
    firstPageText={"First"}
    lastPageText={"Last"}
    itemclassName="page-item"
    linkclassName="page-link"
  />
</div>
)}
      </div>
    </div>
    </>
  )
}

export default Search