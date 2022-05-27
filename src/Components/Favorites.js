import { ExternalLinkIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import {UserAuth} from "../context/AuthContext"
import { db } from '../firebase';
import { doc,onSnapshot, arrayRemove, updateDoc} from "firebase/firestore";


function Favorites() {

  const [favoritesItems, setFavoritesItems] = React.useState([])
  const { user } = UserAuth();
  const favoritesRef = doc(db, "favorites", user.uid)

  const unsub = onSnapshot(doc(db, "favorites", user.uid), (doc) => {
    setFavoritesItems(doc.data().favs);
  });


  const removeFav = async (name) => {
    await updateDoc(favoritesRef, {
    favs: arrayRemove({"name": name.name, "ytb": name.ytb, "url": name.url})
  });}
    
  return (
    
    <div className="container mx-auto px-5 py-10">
    <h2 className="text-xl lg:text-3xl uppercase tracking-wider">My favorites collection</h2>

    <div className="flex flex-col items-center sm:items-start gap-10 mt-5 sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    {favoritesItems.map((favorite) => (

      <div key={favorite.name} className="flex flex-col gap-2 w-64 md:w-72">
          <iframe src={favorite.url} title={favorite.name} allowFullScreen className="w-full" />
          <div className="flex justify-between gap-3 ">
            <a href={favorite.ytb} target="_blank"><ExternalLinkIcon className="w-5 cursor-pointer" /></a>
            <TrashIcon onClick={() => removeFav(favorite)} className="w-5 cursor-pointer" />
          </div>
          <p className="font-light">{favorite.name}</p>
         
      </div>

      )) }
    </div>
    </div>
  
  )
}

export default Favorites