import React from 'react'
import { Link } from 'react-router-dom'
import { FilmIcon, SearchIcon } from '@heroicons/react/outline'

function AllCourses({courses}) {

    const [searchTerm, setSearchTerm] = React.useState("")
    const [input, setInput] = React.useState(false)


  return (
    <div className="container mx-auto px-5 py-10">

    <div className="flex justify-between items-center mb-2 ">

      <h2 className="text-xl lg:text-3xl uppercase tracking-wider">All courses</h2>

      <div className="flex gap-3 justify-end items-center">
        {input && <input type="text" className="hidden md:block border p-1 border-black/50 rounded-sm w-64" placeholder="Search..." onChange={(event) => setSearchTerm(event.target.value)} />}
        <SearchIcon onClick={() => setInput(prevState => !prevState)} className="w-6 cursor-pointer" ></SearchIcon>
      </div>

    </div>
    {input && <input type="text" className="md:hidden border p-1 border-black/50 rounded-sm w-full " placeholder="Search..." onChange={(event) => setSearchTerm(event.target.value)} />}

    <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8 gap-5 items-stretch">

    {courses.filter((course) => {
        if (searchTerm == "") {
            return course      
        }
        else if (course.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return course
        }
    }).map((course,index) => (
      <Link key={course.name} to={`/${course.name}`} className=" flex flex-col gap-2 hover:opacity-90 ">
        
          <img src={course.square_img} alt={course.name}/>
       
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

export default AllCourses