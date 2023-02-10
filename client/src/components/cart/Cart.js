import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../reducers/cartReducers";


const Cart = () => {
  const { products } = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const checkoutHandler = () => {
    Navigate("/login/shipping");
  };
 
  return (
    <>
      {products.length === 0 ? (
        <h2 className="mt-5">Your cart is empty</h2>
      ) : (
        <>
          <MetaData title={"Your Cart"} />
          <div className="cart items-center flex justify-center lg:flex xl:flex lg:justify-center xl:justify-center">
            <div className="wrapper w-full my-20 shadow-lg mx-6 sm:max-w-xl md:max-w-[700px] lg:max-w-[960px] xl:max-w-[960px]">
              <div className="px-8 py-8 text-3xl">
                Your Cart: <b>{products.length} items</b>
              </div>
              <div className="cart-content flex flex-col lg:flex-row xl:flex-row lg:justify-between xl:justify-between gap-10 pb-10">
                <div className=" flex flex-col gap-4">
                  {products.map((item) => (
                    <div
                      className="product flex gap-4 p-4 xs:flex-col sm:flex-col border border-gray-100 rounded"
                      key={item._id}
                    >
                      <div className="w-64 h-64 overflow-hidden rounded-md">
                        <img
                          className="object-cover"
                          src={item.images[0].url}
                          alt=""
                        />
                      </div>
                      <div>
                        <div>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="price text-2xl font-semibold text-[#ffa600]">
                          <p>${item.price}</p>
                        </div>
                        <div className="flex lg:justify-center xl:justify-center gap-10">
                          <div>
                            <div className="flex items-center gap-4">
                              <span className="w-8 h-7 rounded-[4px] font-semibold bg-[#c32a2a] text-white flex justify-center hover:cursor-pointer hover:bg-[#ad2626]" 
                              onClick={()=>dispatch(decreaseQuantity(item._id))}>
                                -
                              </span>
                              <input
                                type="number"
                                className="text-center border outline-gray-200 rounded-sm py-1 w-10"
                                value={item.quantity}
                                readonly
                              />
                              <span className="w-8 h-7 rounded-[4px] font-semibold bg-[#007bff] text-white flex justify-center hover:cursor-pointer hover:bg-[#0367d2]"
                               onClick={() => dispatch(increaseQuantity(item._id))}>
                                +
                              </span>
                            </div>
                          </div>
                          <div className="text-2xl text-[#c32a2a] hover:cursor-pointer hover:text-[#ad2626]">
                            <i className="fa-regular fa-trash-can"  onClick={() => dispatch(removeFromCart(item._id))}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary lg:w-1/3 xl:w-1/3">
                  <div className="px-8">
                    <div className="border flex flex-col gap-5 shadow-lg border-[#e3e3e3] px-5 py-3 rounded-md ">
                      <h4 className="text-2xl mt-3">Order Summary</h4>
                      <hr />
                      <p>
                        Subtotal:{" "}
                        <span className="float-right font-semibold">{products.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )} (Units)</span>
                      </p>
                      <p>
                        Est. total:{" "}
                        <span className="float-right font-semibold">${products.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}</span>
                      </p>
                      <hr />
                      <div className="flex justify-center mt-5 pb-3">
                        <button
                          className="text-white font-semibold bg-[#e79703] w-full py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
                          id="login_button"
                          type="submit"
                          onClick={checkoutHandler}
                        >
                          Check out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <h2 className="mt-5">
            Your Cart: <b>{products.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              <hr />
              {products.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.images[0].url}
                        alt="Laptop"
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">{item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                          readOnly
                        />
                        <span
                          className="btn btn-primary plus"
                          onClick={() => dispatch(increaseQuantity(item._id))}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}

              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {products.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {products.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div> */}
        </>
      )}
    </>
  );
};

export default Cart;
