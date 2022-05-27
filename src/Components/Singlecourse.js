import {  ArrowNarrowDownIcon, ChatAltIcon, ChevronLeftIcon, ChevronRightIcon, CodeIcon, ExternalLinkIcon, HeartIcon} from '@heroicons/react/outline'
import React from 'react'
import {useParams, Link} from "react-router-dom"
import {UserAuth} from "../context/AuthContext"
import { db } from '../firebase';
import { doc, getDocs, setDoc, runTransaction, onSnapshot, Timestamp, updateDoc, arrayUnion} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { comment } from 'postcss';
import { FirebaseError } from 'firebase/app';


function Singlecourse({courses}) {

    const { courseName } = useParams()
    const ref = React.useRef(null);

    // Scroll videos to side
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
      };


    // ADD TO FAVORITES SECTION
    const alreadyAdded = () => 
        toast.warn("Already added to favorites!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

    const sucessfulllyAdded = () => 
    toast.success('Sucessfully added to favorites!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

      const { user } = UserAuth();
      const UserID = user.uid
      const favoritesRef = doc(db, "favorites", UserID)
  
      const test = async (data) => {
          try {
              await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(favoritesRef);
                if (!sfDoc.exists()) {
                  await setDoc(favoritesRef, {
                      favs: [
                          {
                          name: data.name, 
                          ytb: data.ytb, 
                          url: data.url
                      }]})
                }
                const doesExists = sfDoc.data().favs.some((fav) => fav.name === data.name)
                console.log(doesExists)
                
                if (doesExists === true)
                
                {
                  alreadyAdded()
                }
  
                else {
                sucessfulllyAdded()
            
                const currentData = sfDoc.data().favs
                
                transaction.update(favoritesRef, {
                  favs: [...currentData,
                      {
                      name: data.name, 
                      ytb: data.ytb, 
                      url: data.url
                  }]}
              )}
              });
              console.log("Transaction successfully committed!");
            } catch (e) {
              console.log("Transaction failed: ", e);
            }
      }
      
    //   COMMENT SECTION

    const [viewComment, setViewComment] = React.useState(false)



      const today = new Date()
      let day = ("0" + today.getDate()).slice(-2);  //get day with slice to have double digit day
      let month = ("0" + (today.getMonth() + 1)).slice(-2); //get your zero in front of single month digits so you have 2 digit months
      let date = month + '/' + day + '/' + today.getFullYear();   

      const [commentData, setCommentData] = React.useState(
        {
            name: user.email,
            comment:"",
            date: date
        })

    


        function handleChange(event) {
            const {name, value} = event.target
            setCommentData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value
                }
            })
        }


        const addComment = async (event) => {
            event.preventDefault()

            const thisCourse = courses?.filter(course => course.name === courseName)
            const thisCourseName = thisCourse[0]?.docName
            const commentsRef = doc(db, "guard-basics", thisCourseName)

            await updateDoc(commentsRef, {
                comments: arrayUnion({name: commentData.name, comment: commentData.comment, date: commentData.date})
            })
            setCommentData({
            name: user.email,
            comment:"",
            date: date
            })
            window.location.reload();
        }
  

    
        
  return (
    <div className="container mx-auto px-5">
    {courses?.filter(course => course.name === courseName).map((course) => (

        <div key={course.name}>
            <div 
                style={{ 
                background: `url(${course.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center"}} 
                className="h-72 lg:h-96 flex flex-col items-center justify-center relative">
                <h2 className="text-white z-30 text-lg">{course.name}</h2>
                <Link className="z-40" to="/courses"><button className="text-neutral-900 bg-white py-2 px-5 mt-4 uppercase rounded-sm">BROWSE OTHER COURSES</button></Link>
                <div className="absolute bg-neutral-900 w-full h-full opacity-30"></div>
            </div>

            <p className="py-10">{course.description}</p>
            
            <div className="flex justify-between items-center mb-2">

                <h3 className="text-xl lg:text-3xl font-light uppercase tracking-wider">Videos</h3>

                <div className="flex gap-5">
                    <ChevronLeftIcon  onClick={() => scroll(-300)} className="w-8 cursor-pointer"/>
                    <ChevronRightIcon   onClick={() => scroll(300)} className="w-8 cursor-pointer"/>
                </div>
            </div>

            <div ref={ref} className="flex flex-row gap-10 overflow-x-scroll scrollbar-hide scroll-smooth">
            {course.videos.map((video) => (
                <div key={video.name} className="flex flex-col items-start justify-start gap-2">
                    <iframe src={video.url} title={video.name} allowFullScreen />
                    <h1 className="font-light">{video.name}</h1>
                </div>
                ))}
              
            </div>

            <div className="mt-10">
                <h3 className="text-xl lg:text-3xl font-light uppercase tracking-wider">CONTENT</h3>
                <div>
                {course.videos.map((video) => (
                    <ul key={video.name} className="">
                        <div className="border-b p-5 pl-0 border-black/50 flex justify-between gap-5 items-center">
                            <li className="list-disc font-light list-inside w-3/4 sm:w-default">{video.name}</li>
                            <div className="flex gap-5 items-center justify-center">
                                <HeartIcon onClick={() => test(video)} className={`w-5 cursor-pointer hover:text-red-600`} />
                                <a href={video.ytb} target="_blank"><ExternalLinkIcon className="w-5 cursor-pointer hover:opacity-90" /></a>
                                </div>
                        </div>
                    </ul>
                ))}
            </div>
            </div>

            <div className="mt-10 mb-10 flex flex-col gap-5">
                <div className="flex items-center justify-between ">
                    <h3 className="text-xl lg:text-3xl font-light uppercase tracking-wider">COMMENTS</h3>
                    <ChatAltIcon onClick={() => setViewComment(!viewComment)} className="w-5 cursor-pointer" />
                </div>
                <form onSubmit={addComment} className={`w-full flex flex-col items-center gap-5 ${viewComment ? "block" : "hidden"} lg:w-1/2`}>
                    <textarea className=" w-full border p-2 border-black" onChange={handleChange} value={commentData.comment} name="comment" rows="5" placeholder="Add comment" />
                    <button className=" bg-neutral-900 text-white p-3 px-8 uppercase w-full sm:w-auto sm:self-start">SUBMIT</button>
                </form>

                <div>
                    {course.comments.map((comment, index) => (
                    <div key={index} className="border-b border-black/50 flex flex-col py-5 gap-3">
                    <div className={`flex justify-between ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                        <p className="font-semibold ">{comment.name}</p>
                        <p className="text-gray-500">{comment.date}</p>
                    </div>
                        <p className={`font-light ${index % 2 === 0 ? "text-left" : "text-right"}`}>{comment.comment}</p>
                    </div>


                    ))}


                </div>
            </div>

            

                
        </div>
    ))}
    <ToastContainer />
    </div>
  )
}

export default Singlecourse