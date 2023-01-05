import React from "react";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Header />
     <div className = "container container-fluid">
     <Routes>
     <Route path="/" element={<Home />}></Route>
     </Routes>
     </div>
     <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
