import React from 'react'
import {HeartIcon, HomeIcon, LibraryIcon, LoginIcon, LogoutIcon, MailIcon, MenuIcon} from "@heroicons/react/outline"
import {Link, useNavigate} from "react-router-dom"
import { UserAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate()
  const [isOpened, setIsOpened] = React.useState(false)


  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };



  return (
    <div className="container mx-auto px-5 h-16 flex justify-center items-center">

        <div className="flex justify-between w-full items-center">
            <Link to="/"><h1 className="font-bold">JIU JITSU LIBRARY<span className="font-light pl-1 text-sm text-gray-500">beta</span></h1></Link>
            <MenuIcon onClick={() => setIsOpened(prevState => !prevState)} className="w-5 sm:hidden cursor-pointer" />

            <nav className="hidden sm:block">
              <ul className="flex uppercase gap-5 text-sm">
                <Link to ="/"><li className="px-2 cursor-pointer">Home</li></Link>
                <Link to="/courses"><li className="px-2 cursor-pointer">Courses</li></Link>
                {user ? <Link to ="/favorites"><li className="px-2 cursor-pointer">Favorites</li></Link> : "" }
                {user ? <li className="cursor-pointer pl-2 font-semibold" onClick={handleLogout}>Logout</li> : <Link to="/signin"><li className="cursor-pointer pl-2 font-semibold">Sign in</li></Link>}
              </ul>
            </nav>

            <nav className={`${isOpened ? "translate-x-0" : "translate-x-full"} fixed top-0 sm:hidden h-full right-0 w-1/2 bg-gradient-to-r from-white to bg-slate-100 z-50`}>
              <ul className="flex flex-col mt-20 uppercase gap-10 items-start ml-7 text-sm">
                <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to ="/"><HomeIcon className="w-5" /><li className="px-2 cursor-pointer">Home</li></Link>
                <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to="/courses"><LibraryIcon className="w-5"/><li className="px-2 cursor-pointer">Courses</li></Link>
                {user ? <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to ="/favorites"><HeartIcon className="w-5" /><li className="px-2 cursor-pointer">Favorites</li></Link> : "" }
                <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to ="/contact"><MailIcon className="w-5" /><li className="px-2 cursor-pointer">Contact</li></Link>
                {user ? <div className="flex hover:text-black hover:font-bold transition ease-in-out"><LogoutIcon className="w-5" /><li className="cursor-pointer pl-2 font-semibold" onClick={handleLogout}>Logout</li></div> : <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to="/signin"><LoginIcon className="w-5" /><li className="cursor-pointer pl-2 font-semibold">Sign in</li></Link>}
              </ul>
              <button onClick={() => setIsOpened(prevState => !prevState)} className="absolute top-2 left-5 text-xl p-2">X</button>
            </nav>


        </div>

    </div>
  )
}

export default Navbar