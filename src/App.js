import {Routes, Route} from "react-router-dom"
import React from "react"
import {AuthContextProvider} from "./context/AuthContext"
import { collection, getDocs } from "firebase/firestore"
import { db } from './firebase';


import ProtectedRoute from './Components/ProtectedRoute';
import Signin from "./Components/Signin";
import Navbar from "./Components/Navbar"
import Main from "./Components/Main"
import Courses from "./Components/Courses"
import Singlecourse from "./Components/Singlecourse"
import About from "./Components/About"
import Calltoaction from "./Components/Calltoaction";
import Signup from "./Components/Signup"
import AllCourses from "./Components/AllCourses";
import Footer from "./Components/Footer";
import Favorites from "./Components/Favorites";
import Contact from "./Components/Contact";




function App() {

  const [courses, setCourses] = React.useState([])
  const coursesCollectionRef = collection(db, "guard-basics")
  
  React.useEffect(() => {
    const getCourses = async () => {
      const data = await getDocs(coursesCollectionRef)
      setCourses(data.docs.map((doc) => ({...doc.data()})))
      console.log(courses)
    }
    getCourses()

  },[])

  

 

  return (
    <div className="text-neutral-800 text-sm lg:text-base font-inter">
    <AuthContextProvider>
      <Routes>
          <Route exact path="/" 
          element={
            <>
              <Navbar />
              <Main />
              <Courses 
                courses={courses}/>
              <About />
              <Calltoaction />
              <Footer />
            </>
            }>
          </Route>

          <Route path="/:courseName" 
          element={
            <ProtectedRoute>
              <Navbar />
              <Singlecourse 
                courses={courses} 
              />
              <Footer />
            </ProtectedRoute>}>
          </Route>

          <Route path="/courses" 
          element={
            <>
              <Navbar />
              <AllCourses 
              courses={courses}
              /></>}>
          </Route>

          <Route path="/favorites" 
          element={
            <ProtectedRoute>
              <Navbar />
              <Favorites  />
            </ProtectedRoute>}>
          </Route>

          <Route path="/contact" element={<><Navbar/><Contact/></>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>

      </Routes>
    </AuthContextProvider>
    </div>
  );
}

export default App;
