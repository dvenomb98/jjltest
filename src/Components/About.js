import React from 'react'
import mobileBjj from "../img/mobileBjj.jpg"
import belt from "../img/belt.jpg"


function About() {
  return (
    <div className="container mx-auto px-5 py-10">
    <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex flex-col gap-5 basis-4/5 lg:basis-3/5 ">
          <h2 className="text-xl lg:text-3xl font-extrabold tracking-tight uppercase">Learn modern jiu jitsu for free</h2>
          <p className="font-light">We make free courses by gathering the best quality instructional videos from Youtube. Don't watch random videos - we are chaining them together and creating systems and concepts that make perfect sense. </p>
        </div>
        <div className="flex flex-row gap-5 justify-center items-center md:justify-end">
          <img src={mobileBjj} className=" w-5/12 shadow-xl shadow-black/50" alt="Photo" />
          <img src={belt} className="w-5/12 shadow-xl shadow-black/50" alt="Photo" />
        </div>
    </div>
    
    
    
    </div>
  )
}

export default About