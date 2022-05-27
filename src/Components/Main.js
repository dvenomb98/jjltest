import React from 'react'
import { Link } from 'react-router-dom'


function Main() {
  return (
    <div className="container mx-auto px-5">

    <div className="bg-[url('/src/img/Home.jpg')] h-72 lg:h-96 bg-cover bg-center flex flex-col items-center justify-center">
      <h2 className="text-white uppercase">Learn modern jiu jitsu fast.</h2>
      <Link to="/courses"><button className="text-neutral-900 bg-white py-2 px-5 mt-4 uppercase rounded-sm ">Start exploring</button></Link>
    </div>

    </div>
  )
}

export default Main