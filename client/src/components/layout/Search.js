import React, { useEffect, useState } from 'react'
import Product from '../product/Product';
import Loader from "./Loader";
import { useGetProducts } from '../../apiCalls/productApiCalls';

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("5");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [maxRating, setMaxRating] = useState(5)
  

  const { isLoading, data } = useGetProducts(currentPage, limit, search, category, sortBy, maxRating);
  console.log(data)


  const handleSortBySelection = (selectedSortBy) => {
    setSortBy(selectedSortBy);
 
  };


  const handleClearFilters = () => {
    setSearch("");
    setSortBy("");
    setCurrentPage(1);
    setCategory("")
  };

  const categories = [
    "Electronics",
    "Food",
    "Mobile",
    "Stationary"
  ]
console.log(data?.data)

  return (
    <>
     <div className="search-content flex">
      <div className="left w-2/12">
        <div className="filters">
          <h1 className="text-2xl text-center py-3">Filters</h1>
        </div>
      <div className='pl-6 pb-5'>
   
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
           <li style={{cursor:'pointer',listStyleType:'none'}} key={star} onClick={()=> setMaxRating(star)}>
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
            <h1 className="text-2xl py-3">Sort</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sortBy}
                  checked={sortBy === "name"}
                  onChange={() => handleSortBySelection("name")}
                   />
                <label for="text">Alphabetically, A-Z</label>
              </div>
             
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sortBy}
                  checked={sortBy === "-name"}
                  onChange={() => handleSortBySelection("-name")}
                   />
                <label for="text">Alphabetically, Z-A</label>
              </div>
              <button
            onClick={handleClearFilters}
              className="mt-1 px-4 py-2 font-base tracking-wide hover:scale-105 transition-all bg-white btn-shadow hover:shadow-custom hover:bg-stone-50 border border-gray-100 rounded-lg"
            >
              Clear
            </button>
            </div>
          </div>
      </div>

      <div className="right box-border pr-12 pl-4 pt-4 w-5/6">
        <div className="search-bar w-full px-20 pb-8 flex">
          <input
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Businesses"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
        {isLoading ? <Loader/> : (
        <>
        <div className="flex flex-col items-center gap-8">
       
      <div className="flex flex-wrap gap-5 justify-center">
          { data.data.products.map((product)=>(
        <Product key={product._id} product={product} />
         ))
      }
     </div>
     
    </div>

  {data.data.pagination ? 
                  <div>
                    {data.data.pagination.prev && (
                      <button
                        onClick={() =>
                          setCurrentPage(data.data.pagination.prev?.page)
                        }
                      >
                        previous
                      </button>
                    )}
                    <div>{currentPage}</div>
                    {data.data.pagination.next && (
                      <button
                        onClick={() =>
                          setCurrentPage(data.data.pagination.next?.page)
                        }
                      >
                        next
                      </button>
                    )}
                  </div>:null}
                  </>)}
                  
      </div>
    </div>
    </>
  )
}

export default Search