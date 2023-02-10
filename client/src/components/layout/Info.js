import React from 'react'

const Info = () => {
  return (
    <>
    <section className="services bg-[#ffd996]">
    <div
      className="serives-container px-6 py-14 flex flex-col justify-center gap-8 md:gap-20 md:flex-row lg:gap-20 lg:flex-row xl:gap-20 xl:flex-row md:mx-10 lg:mx-24 xl:mx-40">
      <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 xl:max-w-[450px]">
        <h2 className="text-center md:text-left text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-semibold">Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Minus
          illum sed quidem sit in!</h2>
      </div>
      <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 xl:max-w-[450px]">
        <div>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4">
              <img className="h-7" src="images/tick.svg" alt=""/>
              <p className="text-xl">Lorem ipsum dolor sit amet constur adipisig elit. Necatibus, mores?</p>
            </li>
            <li className="flex items-center gap-4">
              <img className="h-7" src="images/tick.svg" alt=""/>
              <p className="text-xl">Lorem ipsum dolor sit amet constur adipisig elit. Necatibus, mores?</p>
            </li>
            <li className="flex items-center gap-4">
              <img className="h-7" src="images/tick.svg" alt=""/>
              <p className="text-xl">Lorem ipsum dolor sit amet constur adipisig elit. Necatibus, mores?</p>
            </li>
          </ul>
        </div>
        <div className=" flex justify-center py-3">
          <button
            className="text-black font-medium bg-[#ffd996] border border-black w-full py-4 rounded-md hover:bg-red-color hover:text-white hover:border-none hover:transition-all">LEARN
            MORE</button>
        </div>
      </div>
    </div>
  </section>

    </>
  )
}

export default Info