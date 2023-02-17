import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDetails, postReviews } from "../../reducers/apiCalls";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { addToCart } from "../../reducers/cartReducers";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [toogleReview, setToogleReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { productsDetails, isFetching, error } = useSelector(
    (state) => state.productSlice
  );
  const { currentUser } = useSelector((state) => state.userSlice);
  //console.log(productsDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    getProductsDetails(dispatch, id);
    //console.log("hit");
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error]);

  const handleClick = () => {
    const cartProduct = productsDetails.product;
    console.log(cartProduct);
    dispatch(addToCart({ ...cartProduct, quantity }));
  };

  const submitReviews = () => {
    postReviews(dispatch, { productId: id, rating, comment });
    window.location.reload();
  };

  const handleNext = () => {
    if (index === productsDetails.product.images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => {
    if (index === 0) {
      setIndex(productsDetails.product.images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        productsDetails.product !== "undefined" && (
          <>
            <MetaData title={productsDetails.product.name} />
            <div className="product-details mx-6 my-4">
              <div className=" flex flex-col lg:flex-row xl:flex-row justify-center items-center md:justify-start md:items-start lg:gap-5 xl:gap-5">
                <div
                  className="flex flex-col self-start"
                  id="product_image"
                >
                  <img
                    className="object-cover w-96 h-96 rounded-md shadow-lg shadow-gray-300"
                    src={productsDetails.product.images[index].url}
                    alt={productsDetails.product.name}
                  />
                  {productsDetails.product.images.length > 1 && 
                  <div className="flex justify-center py-2 gap-2">
                  <button className="py-1 px-4 bg-slate-200 rounded-sm text-sm uppercase" onClick={handleBack}>Prev</button>
                  <button onClick={handleNext}  className="py-1 px-4 bg-slate-200 rounded-sm text-sm uppercase">Next</button>
                  </div>
                  }
                  
                </div>
                <div className="py-5 space-y-3 lg:w-2/5 xl:w-[600px]">
                  <h3 className="text-2xl">{productsDetails.product.name}</h3>
                  <p className="text-sm text-[#808080]" id="product_id">
                    Product # {productsDetails.product._id}
                  </p>

                  <hr />

                  <div className="flex gap-3 items-center">
                    <div className="rating-outer">
                      <div
                        className="rating-inner"
                        style={{
                          width: `${(productsDetails.product.rating / 5) *
                            100}%`,
                        }}
                      ></div>
                    </div>
                    <span id="no_of_reviews">
                      ({productsDetails.product.numOfReviews} Reviews)
                    </span>
                  </div>

                  <hr />

                  <p className="text-3xl font-semibold" id="product_price">
                    ${productsDetails.product.price}
                  </p>
                  {productsDetails.product.stock > 0 && (
                    <div className="flex flex-wrap gap-5">
                      <div className="flex items-center gap-4">
                        <span
                          className="w-8 h-7 rounded-[4px] font-semibold bg-[#c32a2a] text-white flex justify-center hover:cursor-pointer hover:bg-[#ad2626]"
                          onClick={() =>
                            quantity > 1 && setQuantity(quantity - 1)
                          }
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="text-center border outline-gray-200 rounded-sm py-1 w-10"
                          value={quantity}
                          readonly
                        />
                        <span
                          className="w-8 h-7 rounded-[4px] font-semibold bg-[#007bff] text-white flex justify-center hover:cursor-pointer hover:bg-[#0367d2]"
                          onClick={() =>
                            productsDetails.product.stock > quantity &&
                            setQuantity(quantity + 1)
                          }
                        >
                          +
                        </span>
                      </div>
                      <button
                        className="text-white font-semibold bg-[#e79703] px-8 py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
                        id="login_button"
                        type="submit"
                        onClick={handleClick}
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}

                  <hr />

                  <p>
                    Status:{" "}
                    <span
                      className={`text-lg font-semibold ${
                        productsDetails.product.stock
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {productsDetails.product.stock > 0
                        ? "instock"
                        : "out of stock"}
                    </span>
                  </p>

                  <hr />

                  <h4 className="mt-2 text-2xl font-semibold">Description:</h4>
                  <p>{productsDetails.product.description}</p>
                  <hr />
                  <p className="pb-5" id="product_seller">
                    {" "}
                    Sold by: <strong>{productsDetails.product.seller}</strong>
                  </p>
                  {currentUser && (
                    <div className="pb-3">
                      <button
                        className="text-white font-semibold bg-[#e79703] px-14 py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
                        id="login_button"
                        type="submit"
                        onClick={() => setToogleReview(!toogleReview)}
                      >
                        Submit a review
                      </button>
                    </div>
                  )}

                  <div
                    className={`shadow-lg flex flex-col px-3 pt-2 pb-4 w-[250px] rounded-md ${
                      toogleReview ? "" : "hidden"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h2>Submit Review</h2>
                      <i className="text-gray-600 fa-solid fa-xmark"></i>
                    </div>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          role="button"
                          onClick={() => setRating(value)}
                          onKeyDown={() => setRating(value)}
                          tabIndex={0}
                        >
                          {rating >= value ? "⭐️" : "☆"}
                        </span>
                      ))}
                    </div>
                    <textarea
                      name="review"
                      id="review"
                      className="w-full h-[80px] pl-1 mb-4 rounded-sm bg-slate-50"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      className="text-white font-semibold bg-[#e79703] px-10 py-2 rounded-md hover:bg-[#d87803] hover:transition-all"
                      id="login_button"
                      type="submit"
                      onClick={submitReviews}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {productsDetails.product.reviews &&
              productsDetails.product.reviews.map((review) => (
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
                    {review.comment}
                  </h2>
                  <div className="info flex flex-col items-center gap-1">
                    <p className="text-lg font-poppins">~{review.name}</p>
                  </div>
                </div>
              ))}
          </>
        )
      )}
    </>
  );
};

export default ProductDetails;
