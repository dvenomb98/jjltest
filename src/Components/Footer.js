import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="bg-neutral-900">
        <div className="container mx-auto px-5 py-10 ">
          <div className="flex flex-row-reverse justify-between items-center">
              <p className="uppercase text-center text-white">Daniel Bílek © 2022 </p>
              <Link to="contact" className="uppercase text-center text-white">Contact </Link>
          </div>
        </div>
    </div>
  )
}

export default Footer