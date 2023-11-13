import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { usePostOrder } from "../../apiCalls/orderApiCalls";
import { clearCart } from "../../redux/reducers/cartReducers";

const ConfirmOrder = () => {
  const { cart, shippingInfo } = useSelector((state) => state.cartSlice);
  const { currentUser } = useSelector((state) => state.userSlice);
  const userId = currentUser?.data._id

  const dispatch = useDispatch()

  const { mutate:postOrderMutate, isLoading:isPostOrderLoading, isError:isPostOrderError, error:postOrderError } = usePostOrder();

  const userCart = cart[userId] || [];
  const userShippingInfo = shippingInfo[userId] || [];

  // calculate order prices
  const productsPrice = userCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = productsPrice > 200 ? 30 : 60;
  const taxPrice = Number((0.05 * productsPrice).toFixed(2));
  const totalPrice = (productsPrice + shippingPrice + taxPrice).toFixed(2);

  const handlePlaceOrder = () => {

    const productIds = userCart.map((item) => item._id);

    // Create an object with order details
    const orderData = {
      user: userId,
      productIds, // Assuming you have a field in your Course model to store the Course ID
      totalAmount: parseFloat(totalPrice),
      quantity: userCart.length,
      paymentStatus: "pending", // You can set this to a default value
      shippingInfo: userShippingInfo,
    };
    postOrderMutate(orderData,{
      onSuccess: (data) => {
        dispatch(clearCart({ userId }));
      },
    })
    
  }


  return (
    <>
      <CheckoutSteps shipping="shipping" confirmOrder="confirmOrder" />
      <div className="cart items-center flex justify-center lg:flex xl:flex lg:justify-center xl:justify-center">
        <div className="wrapper w-full my-20 shadow-lg mx-6 sm:max-w-xl md:max-w-[700px] lg:max-w-[960px] xl:max-w-[960px]">
          <h2 className="px-8 py-8 text-2xl">Shipping Info</h2>
          <div className="pl-12">
            <p>
              <b>Name:</b>
              {currentUser.data && currentUser.data.username}
            </p>
            <p>
              <b>Phone:</b>
              {userShippingInfo.phoneNo}
            </p>
            <p>
              <b>Address:</b>
              {`${userShippingInfo.address},${userShippingInfo.city},${userShippingInfo.postalCode},${userShippingInfo.country}`}
            </p>
          </div>
          <h2 className="px-8 py-8 text-2xl">Your Cart Items:</h2>
          <div className="cart-content flex flex-col lg:flex-row xl:flex-row lg:justify-between xl:justify-between gap-10 pb-10">
            {userCart.map((item) => (
              <>
                <div className="product flex flex-col gap-5 px-8">
                  <div>
                    <img
                      className="rounded-md"
                      src={item.images[0].url}
                      alt=""
                      height="100"
                      width="100"
                    />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="price text-lg font-semibold text-black">
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${item.quantity * item.price}</b>
                    </p>
                  </div>
                </div>
              </>
            ))}

            <div className="summary lg:w-2/5 xl:w-2/5">
              <div className="px-8">
                <div className="border flex flex-col gap-5 shadow-lg border-[#e3e3e3] px-5 py-3 rounded-md ">
                  <h4 className="text-2xl mt-3">Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{" "}
                    <span className="float-right font-semibold">
                      ${productsPrice}
                    </span>
                  </p>
                  <p>
                    Shipping:{" "}
                    <span className="float-right font-semibold">
                      ${shippingPrice}
                    </span>
                  </p>
                  <p>
                    Tax:{" "}
                    <span className="float-right font-semibold">
                      ${taxPrice}
                    </span>
                  </p>
                  <hr />
                  <p>
                    Total:{" "}
                    <span className="float-right font-semibold">
                      ${totalPrice}
                    </span>
                  </p>
                  <div className="flex justify-center mt-5 pb-3">
                    <button
                    onClick={handlePlaceOrder}
                      className="text-white font-semibold bg-[#e79703] w-full py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
                      id="login_button"
                      type="submit"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
