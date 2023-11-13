import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { useGetProductDetails } from "../../apiCalls/productApiCalls";
import { usePostReview } from "../../apiCalls/reviewApiCalls";
import StarRating from "../StarRating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../redux/reducers/cartReducers";

const ProductDetails = () => {

  const { productId } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()

  const {currentUser} = useSelector(state=>state.userSlice)
  const userId = currentUser?.data._id
 
  const { isLoading: isProductLoading, data: productDetails } = useGetProductDetails(productId)
  const { mutate:postReviewMutate, isLoading:isPostReviewLoading, isError:isPostReviewError , error:postReviewError } = usePostReview()
 

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < productDetails.data.product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

 

   // Function to add the current product to the cart
   const handleAddToCart = () => {
    // Dispatch the addToCart action with the product details and user ID
    dispatch(addToCart({ product: productDetails?.data.product, userId, quantity }));
  };

  // Function to increase the quantity of the current product in the cart
  const handleIncreaseQuantity = () => {
    // Dispatch the increaseQuantity action with the product ID and user ID
    dispatch(increaseQuantity({ productId, userId }));
    setQuantity(quantity + 1);
  };

  // Function to decrease the quantity of the current product in the cart
  const handleDecreaseQuantity = () => {
    // Dispatch the decreaseQuantity action with the product ID and user ID
    dispatch(decreaseQuantity({ productId, userId }));
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const submitReview = (event) => {
    event.preventDefault();
    const data = {productId,rating,title,text};
    postReviewMutate(data);
    console.log(data);
    // Reset form fields and hide the review form
    setRating(0);
    setTitle("");
    setText("");
    setReviewFormVisible(false);
  };

  const toggleReviewForm = () => {
    setReviewFormVisible(!isReviewFormVisible);
  };

  return (
    <>
      {isProductLoading ? (
        <Loader />
      ) : (
          <>
            <div className="product-details mx-6 my-4">
              <div className=" flex flex-col lg:flex-row xl:flex-row justify-center items-center md:justify-start md:items-start lg:gap-5 xl:gap-5">
                <div
                  className="flex flex-col self-start"
                  id="product_image"
                >
                  <img
                    className="object-cover w-96 h-96 rounded-md shadow-lg shadow-gray-300"
                    src={productDetails.data.product.images[currentImageIndex].url}
                    alt={productDetails.data.product.name}
                  />
                  {productDetails.data.product.images.length > 1 && 
                  <div className="flex justify-center py-2 gap-2">
                  {currentImageIndex !== 0 && <button  onClick={handlePreviousImage} className="py-1 px-4 bg-slate-200 rounded-sm text-sm uppercase" >Prev</button>}
                  {currentImageIndex !== productDetails.data.product.images.length-1 &&<button  onClick={handleNextImage} className="py-1 px-4 bg-slate-200 rounded-sm text-sm uppercase">Next</button>}
                  </div>
                  }
                  
                </div>
                <div className="py-5 space-y-3 lg:w-2/5 xl:w-[600px]">
                  <h3 className="text-2xl">{productDetails.data.product.name}</h3>
                  <p className="text-sm text-[#808080]" id="product_id">
                    Product # {productDetails.data.product._id}
                  </p>

                  <hr />

                  <div className="flex gap-3 items-center">
                    <div className="rating-outer">
                      <div
                        className="rating-inner"
                        style={{
                          width: `${(productDetails.data.product.averageRating / 5) *
                            100}%`,
                        }}
                      ></div>
                    </div>
                    <span id="no_of_reviews">
                      ({productDetails.data.product.reviews.length} Reviews)
                    </span>
                  </div>

                  <hr />

                  <p className="text-3xl font-semibold" id="product_price">
                    ${productDetails.data.product.price}
                  </p>
               
               {currentUser ?
                  <div className="flex flex-wrap gap-5">
      <div className="flex items-center gap-4">
        <span
          className="w-8 h-7 rounded-[4px] font-semibold bg-[#c32a2a] text-white flex justify-center hover:cursor-pointer hover:bg-[#ad2626]"
          onClick={handleDecreaseQuantity}
        >
          -
        </span>
        <input
          type="number"
          className="text-center border outline-gray-200 rounded-sm py-1 w-10"
          value={quantity}
          readOnly
        />
        <span
          className="w-8 h-7 rounded-[4px] font-semibold bg-[#007bff] text-white flex justify-center hover:cursor-pointer hover:bg-[#0367d2]"
          onClick={handleIncreaseQuantity}
        >
          +
        </span>
      </div>
      <button
        className="text-white font-semibold bg-[#e79703] px-8 py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
        id="login_button"
        type="submit"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div> : null }
                

                  <hr />

                  <p>
                    Status:{" "}
                    <span
                      className={`text-lg font-semibold ${
                        productDetails.data.product.stock
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {productDetails.data.product.stock > 0
                        ? "instock"
                        : "out of stock"}
                    </span>
                  </p>

                  <hr />

                  <h4 className="mt-2 text-2xl font-semibold">Description:</h4>
                  <p>{productDetails.data.product.description}</p>
                  <hr />
                 
                 {currentUser ?
                    <div className="pb-3">
                      <button
                        className="text-white font-semibold bg-[#e79703] px-14 py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
                        id="login_button"
                        type="submit"
                        onClick={toggleReviewForm}
                      >
                        Submit a review
                      </button>
                    </div> : null }
            

                    {isReviewFormVisible && (
      <div className="shadow-lg flex flex-col px-3 pt-2 pb-4 w-[250px] rounded-md">
        <div className="flex items-center justify-between">
          <h2>Submit Review</h2>
          <i
            className="text-gray-600 fa-solid fa-xmark"
            onClick={toggleReviewForm}
          ></i>
        </div>
        <div className="rating">
        <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <textarea
          placeholder="Your review"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          className="w-full h-[80px] pl-1 mb-4 rounded-sm bg-slate-50"
        ></textarea>
        <button
          className="text-white font-semibold bg-[#e79703] px-10 py-2 rounded-md hover:bg-[#d87803] hover:transition-all"
          id="login_button"
          type="submit"
          onClick={submitReview}
        >
          Submit
        </button>
      </div>
    )}

                </div>
              </div>
            </div>

            {productDetails.data.product.reviews &&
             productDetails.data.product.reviews.map((review) => (
                <div className="review-card flex flex-col items-center">
                  <div className="ratings mt-auto">
                    <div className="rating-outer">
                      <div
                        className="rating-inner"
                        style={{ width: `${(review.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h2 className="text-center text-xl lg:text-2xl xl:text-2xl font-medium py-6">
                    {review.text}
                  </h2>
                  <div className="info flex flex-col items-center gap-1">
                    <p className="text-lg font-poppins">~{review.title}</p>
                  </div>
                </div>
              ))}
          </>
        )
      }
    </>
  );
};

export default ProductDetails;
