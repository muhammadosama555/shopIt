import React from 'react'

const Bundles = () => {
  return (
    <>
      <section className="bundle-sale my-5">
    <div className="md:hidden lg:hidden xl:hidden bg-no-repeat bg-top bg-center/cover bg-cover h-[500px]"
      style={{backgroundImage: `url("/images/bundle-bg.jpg")`}}>
      <div className="content">
        <div className="shipping flex flex-col justify-center items-center pt-4">
          <p className="text-xl">Get 12 Cartons,</p>
          <p className="font-semibold text-2xl">Get Free Shipping</p>
        </div>
        <div className="info flex flex-col h-[410px] justify-between">
          <p className="text-center text-3xl mt-14 font-semibold">Buy Bundle & Save 10%</p>
          <div className="flex justify-center mx-6">
            <button
              className="text-white text-lg font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all">SHOP
              4-PACK
              BUNDLES</button>
          </div>
        </div>
      </div>
    </div>
    <div className="hidden md:flex lg:flex xl:flex bg-no-repeat bg-cover bg-h-[700px] xl:h-[1200px]"
      style={{backgroundImage: `url("images/bundle-bg-bigScreen.webp")`}}>
      <div className="content relative w-full">
        <div
          className="shipping xl:pt-8 md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center xl:flex xl:justify-center xl:items-center pt-4">
          <p className="text-2xl">Get 12 Cartons,</p>
          <p className="font-semibold text-2xl">Get Free Shipping</p>
        </div>
        <div className="info flex flex-col absolute h-full justify-center gap-8 mt-4 ml-24 xl:ml-44">
          <p className="text-center text-5xl font-semibold">Buy Bundle & Save 10%</p>
          <div className="flex justify-center">
            <button
              className="text-white text-2xl font-semibold bg-red-color min-w-[366px] py-5 rounded-md hover:bg-[#910811] hover:transition-all">SHOP
              4-PACK BUNDLES</button>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Bundles