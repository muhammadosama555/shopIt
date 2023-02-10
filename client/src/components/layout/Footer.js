import React from 'react'
import { Link } from 'react-router-dom'
import "../../App.css"

const Footer = () => {
  return (
    <>
    <footer className="bg-[#e7a227]">
    <div className="mx-6 py-10 md:flex lg:flex xl:flex gap-10">
      <div className="follow mb-8 xl:pr-10">
        <div>
          <h1 className="text-2xl">Follow Us</h1>
        </div>
        <div className="social-icons flex pt-3 space-x-3">
          <div className="w-10 h-10 bg-[#2b1a1a]  rounded-full flex justify-center items-center">
            <i className="text-2xl text-[#e7a227] fa-brands fa-facebook-f"></i>
          </div>
          <div className="w-10 h-10 bg-[#2b1a1a]  rounded-full flex justify-center items-center">
            <i className="text-2xl text-[#e7a227] fa-brands fa-instagram"></i>
          </div>
          <div className="w-10 h-10 bg-[#2b1a1a]  rounded-full flex justify-center items-center">
            <i className="text-2xl text-[#e7a227] fa-brands fa-twitter"></i>
          </div>
          <div className="w-10 h-10 bg-[#2b1a1a]  rounded-full flex justify-center items-center">
            <i className="text-2xl text-[#e7a227] fa-brands fa-linkedin-in"></i>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between grow gap-4">
        <div className="explore flex flex-col  grow w-48 gap-4">
          <h1 className="text-2xl">Explore</h1>
          <ul className="font-semibold flex flex-col gap-4">
            <li><Link to="#">Our Story</Link></li>
            <li><Link to="#">Products</Link></li>
            <li><Link to="#">FAQ</Link></li>
            <li><Link to="#">Customer Stories</Link></li>
          </ul>
        </div>

        <div className="Company flex flex-col grow w-48 gap-4">
          <h1 className="text-2xl">Company</h1>
          <ul className="font-semibold flex flex-col gap-4">
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Brand Ambassador</Link></li>
            <li><Link to="#">Wholesale</Link></li>
            <li><Link to="#">Refer a Friend</Link></li>
            <li><Link to="#">Store Locations</Link></li>
          </ul>
        </div>

        <div className="customers flex flex-col grow w-48 gap-4">
          <h1 className="text-2xl">Customers</h1>
          <ul className="font-semibold flex flex-col gap-4">
            <li><Link to="#"></Link>Account</li>
            <li><Link to="#">Get Help</Link></li>
          </ul>
        </div>
      </div>

    </div>
    <div className="w-full h-[0.5px] bg-[#d1911f]"></div>
    <div className="px-6 py-8">
      <ul className="flex flex-wrap gap-4 underline">
        <li>© Shoppy Trolly 2023.</li>
        <li><Link to="#">© Shoppy Trolly 2023.</Link></li>
        <li><Link to="#">Contact Us</Link></li>
        <li><Link to="#">Refund Policy</Link></li>
        <li><Link to="#">Privacy Policy</Link></li>
        <li><Link to="#">Terms & Conditions</Link></li>
        <li><Link to="#">Do Not Sell My Personal Information</Link></li>
      </ul>
    </div>
  </footer>
    </>
  )
}

export default Footer