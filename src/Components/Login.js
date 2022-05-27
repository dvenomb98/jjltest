import React from 'react'
import {useNavigate} from "react-router-dom"
import {UserAuth} from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const navigate = useNavigate()
  const { signIn } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate("/home")
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };
  

  return (
    <div className="bg-[url('/src/img/bjjcourses.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex items-center justify-center">
        
        <div className="bg-white p-5 px-10 rounded-sm md:w-1/2 lg:w-1/3 shadow-xl shadow-slate-50/40">

          
           
        <h1 className="font-bold text-xl text-center">Learn fast.</h1>
          

          {error && <p className="bg-red-600 text-center text-white p-1">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-2">

            <div className="flex flex-col gap-2">
              <label className="font-medium">Emailová adresa</label>
              <input onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-sm" type="email" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Heslo</label>
              <input onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded-sm" type="password" />
            </div>

          <button className="bg-red-600 text-white rounded-sm py-2 mt-5">Přihlásit se</button>
          
          </form>
        
        </div>
        </div>
    </div>
  )
}

export default Login