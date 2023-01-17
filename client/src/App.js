import React from "react";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";

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
     </Routes>
     </div>
     <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
