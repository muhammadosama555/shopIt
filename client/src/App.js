import React, { useState } from "react";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
 import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
// import UpdatePassword from "./components/user/UpdatePassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Offers from "./components/layout/Offers";
import "./App.css";
import Search from "./components/layout/Search";

const queryClient = new QueryClient()

function App() {

  return (
    <>
     <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="App">
        <Offers/>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/product/:productId" element={<ProductDetails />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
           <Route path="/profile" element={<Profile />} />
              <Route path="/profile/update" element={<UpdateProfile />} />
              {/* <Route path="/password/update" element={<UpdatePassword />} /> */}
              <Route path="/order/shipping" element={<Shipping />} />
              <Route path="/order/confirmOrder" element={<ConfirmOrder />} />
           
           
          </Routes>
        </div>
        <Footer />
         {/* <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        /> */}
    </BrowserRouter>
    <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
    </>
  );
}

export default App;
