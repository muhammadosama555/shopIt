import React from "react";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedOutlet from "./components/route/ProtectedOutlet";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";

function App() {


  return (
    <BrowserRouter>
    <div className="App">
     <Header />
     <div className = "container container-fluid">
     <Routes>
     <Route path="/" element={<Home />}></Route>
     <Route path="/search/:keyword" element={<Home />}></Route>
     <Route path="/product/:id" element={<ProductDetails />}></Route>
     <Route path="/login" element={<Login />}></Route>
     <Route path="/register" element={<Register />}></Route>
     <Route path='/' element={<ProtectedOutlet/>}>
      <Route path='/me' element={<Profile />}/>
      <Route path='/me/update' element={<UpdateProfile />}/>
      <Route path='/password/update' element={<UpdatePassword />}/>
     </Route>
     </Routes>
     </div>
     <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
