import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useGetProducts } from '../../apiCalls/productApiCalls'

const Hero = () => {
  const { isLoading: isproductsLoading, data: products } = useGetProducts()
  console.log(products?.data)

  return (
    <>
    
        <>
          <section className="hero bg-[#fdb6b7] px-6 pb-20 lg:pb-40 xl:pt-20 xl:pb-64">
            <div className="flex justify-center items-center xs:flex xs:flex-col gap-10 pt-10">
              <div className="md:max-w-[350px] lg:max-w-[490px] xl:max-w-[490px]">
                <div className="rating flex justify-center pb-5">
                  <div className="bg-[#fff9ef] items-center gap-1 inline-flex px-[15px] py-2 rounded-full">
                    <i className="text-yellow-400 fa-solid fa-star"></i>
                    <i className="text-yellow-400 fa-solid fa-star"></i>
                    <i className="text-yellow-400 fa-solid fa-star"></i>
                    <i className="text-yellow-400 fa-solid fa-star"></i>
                    <i className="text-yellow-400 fa-solid fa-star-half-stroke"></i>
                    <h4 className="text-sm font-medium">
                      25,430+ 5-Star Reviews
                    </h4>
                  </div>
                </div>
                <div className="hero-desc text-center">
                  <h1 className="text-4xl font-semibold pb-3">
                    Hello,How Are You?
                  </h1>
                  <p className="text-xl">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Perspiciatis, labore.
                  </p>
                </div>
                <div className="hidden md:flex lg:flex xl:flex justify-center mt-5 md:pb-5">
                  <button className="text-white text-lg lg:w-[320px] xl:w-[320px] font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all">
                    SHOP BEST SELLERS
                  </button>
                </div>
              </div>
              {isproductsLoading ? (
        <Loader />
      ) : 
              <div className="hero-items flex justify-center gap-5 py-5 md:max-w-[410px] lg:max-w-2xl">
                {products.data.products.slice(0, 2).map((product) => (
                    <div
                      className="card1 card-shadow flex bg-[#fff9ef] py-4 px-8 rounded-md justify-center items-center "
                      key={product._id}
                    >
                      <Link to={`/product/${product._id}`}>
                        <img
                          className="h-28 lg:h-44 xl:h-44 w-full"
                          src={product.images[0].url}
                          alt=""
                        />
                      </Link>
                    </div>
                  ))}
                  </div>}
              <div className="flex xs:w-full md:hidden lg:hidden xl:hidden justify-center ">
                <button className="text-white text-lg font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all">
                  SHOP BEST SELLERS
                </button>
              </div>
            </div>
          </section>

          <section className="review mt-5">
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
              <div className="text-center pt-5 px-6">
                <p className="text-xl">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  culpa nobis molestias saepe repellat nostrum?"
                </p>
                <h3 className="text-3xl font-semibold">Forbes</h3>
              </div>
              <div className="text-center pt-5 px-6">
                <p className="text-xl">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  culpa nobis molestias saepe repellat nostrum?"
                </p>
                <h3 className="text-3xl font-semibold">Forbes</h3>
              </div>
              <div className="text-center pt-5 px-6">
                <p className="text-xl">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  culpa nobis molestias saepe repellat nostrum?"
                </p>
                <h3 className="text-3xl font-semibold">Forbes</h3>
              </div>
            </div>
          </section>
        </>
  
    </>
  );
};

export default Hero;
