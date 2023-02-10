import React from 'react'
import { Link } from "react-router-dom";

const Product = ({product}) => {
  return (
    <>
     {/* <div
          class="product card-shadow flex flex-col items-center text-center rounded-md w-40 md:min-w-[170px] lg:min-w-[200px] xl:min-w-[200px] hover:transition-all hover:scale-110">
          <div class="product-display py-4">
            <img class="h-24 md:h-32 lg:h-40 xl:h-40 w-24 md:w-32 lg:w-40 xl:w-40" src="images/ring.png" alt=""/>
          </div>
          <div class="">
            <i class="text-yellow-400 fa-solid fa-star"></i>
            <i class="text-yellow-400 fa-solid fa-star"></i>
            <i class="text-yellow-400 fa-solid fa-star"></i>
            <i class="text-yellow-400 fa-solid fa-star"></i>
            <i class="text-yellow-400 fa-solid fa-star-half-stroke"></i>
            <h4 class="text-sm pt-1 text-gray-500">25,430 Reviews</h4>
          </div>
          <div class="product-name">
            <h2 class="text-2xl pb-4">Product-3</h2>
          </div>
        </div> */}

       <div className="product card-shadow flex flex-col items-center text-center rounded-md w-40 md:min-w-[170px] lg:min-w-[200px] xl:min-w-[200px] hover:transition-all hover:scale-110">
          <div className="product-display py-4">
            <img className="h-24 md:h-32 lg:h-40 xl:h-40" src={product.images[0].url} alt="card"/>
          </div>
          <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style={{width: `${(product.rating/5)*100}%`}}></div>
          </div>
          </div>
          <div className="product-name">
            <h2 className="text-lg pb-4"> <Link to={`/product/${product._id}`}>{product.name}</Link></h2>
          </div>
          <div className="product-details">
            <h2 className="text-lg pb-4 font-semibold"> <Link to={`/product/${product._id}`}>View Details</Link></h2>
          </div>
        </div>


    {/* <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
    <div className="card p-3 rounded">
      <img
        className="card-img-top mx-auto"
        src={product.images[0].url} alt='card'
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style={{width: `${(product.rating/5)*100}%`}}></div>
          </div>
          <span id="no_of_reviews">{product.numOfRevi}</span>
        </div>
        <p className="card-text">${product.price}</p>
        <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
      </div>
    </div>
  </div> */}
  </>
  )
}

export default Product