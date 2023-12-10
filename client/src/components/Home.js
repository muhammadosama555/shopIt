import React, { useEffect } from "react";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import Hero from "./layout/Hero";
import Bundles from "./layout/Bundles";
import Reviews from "./layout/Reviews";
import Info from "./layout/Info";
import Subscription from "./layout/Subscription";
import { Link } from "react-router-dom";
import { useGetProducts } from "../apiCalls/productApiCalls";
import Slider from "react-slick";

const Home = () => {
  const { isLoading: isproductsLoading, data: products } = useGetProducts();
  console.log(products?.data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <>
        <Hero />
        <section className="best-products my-5 mx-6">
          <div>
            <h1 className="text-center text-2xl font-semibold py-8">
              Best Selling Products
            </h1>
          </div>
          {isproductsLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-wrap gap-5 justify-center">
                {products.data.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <div className="flex justify-center items-center md:max-w-[333px] lg:max-w-[333px] xl:max-w-[333px] pb-10 w-full">
                <Link
                  to="/search"
                  className="text-white justify-center flex text-lg font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"
                >
                  EXPLORE ALL PRODUCTS
                </Link>
              </div>
            </div>
          )}
        </section>

        <Bundles />
        <Reviews />
        <Info />
        <Subscription />

        {/* <Slider {...settings}>
    <div className="w-1/2 h-64 flex justify-center items-center">
        <img className="m-auto w-1/2 h-full object-cover rounded-lg" src="/images/agent1.jpg" alt="Slide 1" />
    </div>
    <div className="w-1/2 h-64 flex justify-center items-center">
        <img className="m-auto w-1/2 h-full object-cover rounded-lg" src="/images/airpords.jpg" alt="Slide 2" />
    </div>
    <div className="w-1/2 h-64 flex justify-center items-center">
        <img className="m-auto w-1/2 h-full object-cover rounded-lg" src="/images/camera.jpg" alt="Slide 3" />
    </div>
</Slider> */}
      </>
    </>
  );
};

export default Home;
