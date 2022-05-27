import { FilmIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'


function Courses({courses}) {

  const ref = React.useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };


  return (
    <div className="container mx-auto px-5 py-10">

    

    <div className="flex justify-between items-center mb-2">

      <h2 className="text-xl lg:text-3xl uppercase tracking-wider">Courses</h2>

      <div className="flex gap-5 items-center justify-center">
        <Link to="/courses" className=" cursor-pointer text-sm">VIEW ALL</Link>
        <ChevronLeftIcon  onClick={() => scroll(-300)} className="w-8 cursor-pointer"/>
        <ChevronRightIcon   onClick={() => scroll(300)} className="w-8 cursor-pointer"/>
      </div>
    </div>

    <div ref={ref} className="mt-5 flex flex-row gap-5 overflow-x-scroll items-stretch scrollbar-hide scroll-smooth">
    {courses.map((course) => (
      <Link to={`/${course.name}`} key={course.name} className=" flex flex-col gap-2 min-w-[10rem] md:w-1/3 lg:w-1/5 hover:opacity-90 ">
        
          <img src={course.square_img} alt={course.name}  />
       
        <div className="flex justify-between items-center w-full">
          <h3 className="uppercase  text-sm">{course.name}</h3>
          <div className="flex items-center rounded-md bg-black p-1 gap-1">
            <FilmIcon className="w-4 text-white" />
            <p className="text-white text-sm tracking-wider">{course.videos.length}</p>
          </div>
        </div>
      </Link>
    ))}
    </div>
    
    
    </div>
  )
}

export default Courses