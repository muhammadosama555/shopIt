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

  let count = productsData.filteredProductsCount;


 
  const history = useNavigate();

  // const searchHandler = (e) => {
  //   e.preventDefault()

  //   if (keyword.trim()) {
  //     history(`/search/${keyword}`)
  //   }else{
  //     history("/")
  //   }
  // }

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

        <div class="flex flex-col items-center gap-8">
      <div class="flex flex-wrap gap-5 justify-center">
          { productsData.products && productsData.products.map((product)=>(
        <Product key={product._id} product={product} />
         ))
      }
     </div>
     
    </div>
  {productsData.count <= count && (
    <div className="flex justify-center my-5">
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
      </div>
    </div>










    {/* <div className='col-6 col-md-3 mt-5 mb-5'>
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


    <hr className='my-3' />

    <div className='mt-5'>
     <h4 className='mb-3'>
       Ratings
     </h4>
     <ul className='pl-0'>
       {[5,4,3,2,1].map((star)=>(
        <li style={{cursor:'pointer',listStyleType:'none'}} key={star} onClick={()=> setRatings(star)}>
         <div className='rating-outer'>
           <div className='rating-inner' style={{width: `${star * 20}%`}}>
           </div>
         </div>
        </li>
       ))}
     </ul>
    </div>

    </div>
   </div>

    <div className={`search-bar ${openSearch ? "" : "hidden"} `} >
    <form onSubmit={searchHandler}>
      <div className="flex relative items-center">
        <div className="absolute pl-6"><i class="text-gray-400 fa-solid fa-magnifying-glass"></i></div>
        <input className="px-14 py-4 w-full" type="text" name="search" id="search" placeholder="Start Typing..."  onChange={(e)=>setKeyword(e.target.value)}/>
        <div className="absolute right-6"><i class="text-gray-400 fa-solid fa-x" onClick={()=>setOpenSearch(false)}></i></div>
      </div>
    </form>
  </div> */}

    {/* <form onSubmit={searchHandler}>
        <div className="input-group">
             <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
              onChange={(e)=>setKeyword(e.target.value)}
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
    </form> */}
    </>
  )
}

export default Search