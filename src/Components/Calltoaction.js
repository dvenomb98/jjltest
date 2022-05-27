import React from 'react'
import { Link } from 'react-router-dom'
import {UserAuth} from "../context/AuthContext"

function Calltoaction() {

  const {user} = UserAuth()



    return (
      <div>
      {!user ? 
        <div className="bg-gray-50">
        <div className="container mx-auto px-5 py-20">
          <div className="mx-auto lg:flex lg:items-center lg:justify-between">
            <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 lg:text-3xl">
              <span className="block uppercase">Ready to dive in?</span>
              <span className="rounded-sm uppercase block text-gray-600">Start learning today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="signup"
                  className="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-sm text-white bg-neutral-900 hover:text-neutral-900 hover:bg-white"
                >
                  Sign up
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
            <Link 
              to="/signin"
              className="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-sm text-neutral-900 bg-white hover:bg-gray-600 hover:text-white"
            >
              Sign in
            </Link>
          </div>
              
            </div>
          </div>
        </div>
        </div>

      :

      <div className="bg-gray-50">
        <div className="container mx-auto px-5 py-20">
          <div className="mx-auto lg:flex lg:items-center lg:justify-between">
            <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 lg:text-3xl">
              <span className="block uppercase">Do you want to create your own course?</span>
              <span className="rounded-sm uppercase block text-gray-600">Send us an email!</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="contact"
                  className="inline-flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-sm text-white bg-neutral-900 hover:text-neutral-900 hover:bg-white"
                >
                  Contact us
                </Link>
              </div>         
            </div>
          </div>
        </div>
        </div>
      }
      </div> 
       )
}

export default Calltoaction