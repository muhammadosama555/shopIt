import React from 'react'

const Subscription = () => {
  return (
    <>
    <section
    className="subscribe md:flex justify-center lg:flex xl:flex md:pt-28 md:pb-36 md:px-10 lg:pt-28 lg:pb-36 lg:px-10 xl:pt-28 xl:pb-36 xl:px-10 bg-[#dca15b] md:bg-[#fff9ee] lg:bg-[#fff9ee] xl:bg-[#fff9ee]">
    <div className="md:flex lg:flex xl:flex md:gap-5 lg:gap-8 xl:gap-10">
      <div className="md:hidden lg:hidden xl:hidden">
        <img className="w-full" src="images/juice.webp" alt=""/>
      </div>
      <div className="xs:hidden w-1/2 rounded-lg overflow-hidden">
        <img className="w-full max-w-[530px]" src="images/juice-2.webp" alt=""/>
      </div>
      <div className="flex flex-col justify-center">
        <div className="mx-10">
          <h1 className="text-center text-4xl font-semibold">Subscribe % Save</h1>
          <p className="text-xl text-center py-4">No Commitment • Delivered Monthly</p>
        </div>
        <div className="flex justify-center mx-6 py-3">
          <button
            className="text-white font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all">SHOP
            SUBSCRIPTIONS</button>
        </div>
        <div className="pb-10">
          <p className="text-lg text-center font-semibold">Free Shipping with 12+ Purchases</p>
        </div>
      </div>
    </div>
  </section>
  <section className="coupen-sect">
    <div className="mx-6 flex mt-14 pb-14 flex-col lg:flex-row xl:flex-row xl:justify-center lg:items-center gap-5">
      <div className="text-center lg:text-left xl:text-left lg:w-1/2">
        <h2 className="text-2xl font-semibold">Take an extra 10% off your first order</h2>
        <p className="text-lg font-light pt-4">We'll also send you notifications about our new products and updates etc.</p>
      </div>
      <form className="flex flex-col gap-5 md:flex md:gap-5 lg:w-1/2 xl:flex-row xl:gap-5" action="">
        <input className="bg-gray-50 px-4 py-3 xl:my-3 xl:pr-10 rounded-lg text-lg w-full" type="email" name="email"
          id="email" placeholder="Your email"/>
        <button
          className="text-white font-semibold xl:my-3 xl:px-10  bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all">SHOP
          SUBSCRIPTIONS</button>
      </form>
    </div>
  </section>
    </>
  )
}

export default Subscription