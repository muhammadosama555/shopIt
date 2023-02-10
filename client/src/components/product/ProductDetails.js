import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDetails, postReviews } from "../../reducers/apiCalls";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import { addToCart } from "../../reducers/cartReducers";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [toogleReview, setToogleReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


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
  }, [dispatch, error, id]);

  const handleClick = () => {
    const cartProduct = productsDetails.product;
    console.log(cartProduct);
    dispatch(addToCart({ ...cartProduct, quantity }));
  };

  const submitReviews = () =>{
    postReviews(dispatch,{productId:id,rating,comment})

  }

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        productsDetails.product !== "undefined" && (
          <>
            <MetaData title={productsDetails.product.name} />
            <div class="product-details mx-6">
              <div class=" flex flex-col lg:flex-row xl:flex-row justify-center items-center md:justify-start md:items-start lg:gap-5 xl:gap-5">
                <div
                  class="flex justify-start items-start lg:-mt-96 xl:-mt-96"
                  id="product_image"
                >
                  <Carousel pause="hover">
                    {productsDetails.product.images &&
                      productsDetails.product.images.map((image) => (
                        <Carousel.Item key={image.public_id}>
                          <img
                            className="d-block w-100"
                            src={image.url}
                            alt={productsDetails.product.name}
                          />
                        </Carousel.Item>
                      ))}
                  </Carousel>
                </div>

                <div class="py-5 space-y-3 lg:w-2/5 xl:w-[600px]">
                  <h3 class="text-2xl">{productsDetails.product.name}</h3>
                  <p class="text-sm text-[#808080]" id="product_id">
                    Product # {productsDetails.product._id}
                  </p>

                  <hr />

                  <div class="flex gap-3 items-center">
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

                  <p class="text-3xl font-semibold" id="product_price">
                    ${productsDetails.product.price}
                  </p>
                  {productsDetails.product.stock > 0 && (
                    <div class="flex flex-wrap gap-5">
                      <div class="flex items-center gap-4">
                        <span
                          class="w-8 h-7 rounded-[4px] font-semibold bg-[#c32a2a] text-white flex justify-center hover:cursor-pointer hover:bg-[#ad2626]"
                          onClick={() =>
                            quantity > 1 && setQuantity(quantity - 1)
                          }
                        >
                          -
                        </span>
                        <input
                          type="number"
                          class="text-center border outline-gray-200 rounded-sm py-1 w-10"
                          value={quantity}
                          readonly
                        />
                        <span
                          class="w-8 h-7 rounded-[4px] font-semibold bg-[#007bff] text-white flex justify-center hover:cursor-pointer hover:bg-[#0367d2]"
                          onClick={() =>
                            productsDetails.product.stock > quantity &&
                            setQuantity(quantity + 1)
                          }
                        >
                          +
                        </span>
                      </div>
                      <button
                        class="text-white font-semibold bg-[#e79703] px-8 py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
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
                      class={`text-lg font-semibold ${
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

                  <h4 class="mt-2 text-2xl font-semibold">Description:</h4>
                  <p>{productsDetails.product.description}</p>
                  <hr />
                  <p class="pb-5" id="product_seller">
                    {" "}
                    Sold by: <strong>{productsDetails.product.seller}</strong>
                  </p>
                  {currentUser && (
                    <div class="pb-3">
                      <button
                        class="text-white font-semibold bg-[#e79703] px-14 py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
                        id="login_button"
                        type="submit"
                        onClick={() => setToogleReview(!toogleReview)}
                      >
                        Submit a review
                      </button>
                    </div>
                  )}

                  <div
                    class={`shadow-lg flex flex-col px-3 pt-2 pb-4 w-[250px] rounded-md ${
                      toogleReview ? "" : "hidden"
                    }`}
                  >
                    <div class="flex items-center justify-between">
                      <h2>Submit Review</h2>
                      <i class="text-gray-600 fa-solid fa-xmark"></i>
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
                    {/* <div class="text-[#f5c518] pt-1 text-2xl pb-3">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div> */}
                    <textarea
                      name="review"
                      id="review"
                      class="w-full h-[80px] pl-1 mb-4 rounded-sm bg-slate-50"
                      onChange={(e)=>setComment(e.target.value)}
                    ></textarea>
                    <button
                      class="text-white font-semibold bg-[#e79703] px-10 py-2 rounded-md hover:bg-[#d87803] hover:transition-all"
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

            {/* <div className="row f-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {productsDetails.product.images &&
                    productsDetails.product.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <img
                          className="d-block w-100"
                          src={image.url}
                          alt={productsDetails.product.name}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{productsDetails.product.name}</h3>
                <p id="product_id">Product # {productsDetails.product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{
                      width: `${(productsDetails.product.rating / 5) * 100}%`,
                    }}
                  ></div>
                </div>
                <span id="no_of_reviews">
                  ({productsDetails.product.numOfReviews} Reviews)
                </span>

                <hr />

                <p id="product_price">${productsDetails.product.price}</p>
                <div className="stockCounter d-inline">
                  <span
                    className="btn btn-danger minus"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span
                    className="btn btn-primary plus"
                    onClick={() =>
                      productsDetails.product.stock > quantity &&
                      setQuantity(quantity + 1)
                    }
                  >
                    +
                  </span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  onClick={handleClick}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={
                      productsDetails.product.stock ? "greenColor" : "redColor"
                    }
                  >
                    {productsDetails.product.stock > 0
                      ? "instock"
                      : "out of stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{productsDetails.product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{productsDetails.product.seller}</strong>
                </p>

                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                >
                  Submit Your Review
                </button>

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                            ></textarea>

                            <button
                              className="btn my-3 float-right review-btn px-4 text-white"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </>
        )
      )}
    </>
  );
};

export default ProductDetails;
