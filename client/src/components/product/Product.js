import React from 'react'
import { Link } from "react-router-dom";

const Product = ({product}) => {
  return (
    <>
       <div className="product card-shadow flex flex-col items-center text-center rounded-md w-40 md:min-w-[170px] lg:min-w-[200px] xl:min-w-[200px] hover:transition-all hover:scale-110">
          <div className="product-display py-4">
            <img className="h-24 md:h-32 lg:h-40 xl:h-40" src={product.images[0].url} alt="card"/>
          </div>
          {product.reviews.length > 0 ? 
          <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style={{width: `${(product.averageRating/5)*100}%`}}></div>
          </div> 
          </div> : null }
          <div className="product-name">
            <h2 className="text-lg pb-4"> <Link to={`/product/${product._id}`}>{product.name}</Link></h2>
          </div>
          <div className="product-details">
            <h2 className="text-lg pb-4 font-semibold"> <Link to={`/product/${product._id}`}>View Details</Link></h2>
          </div>
        </div>
  </>
  )
}

export default Product