import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";

const API = import.meta.env.VITE_NASA_API_KEY;

const App = () => {
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    Axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API}`).then((resp) => {
      setDate(resp.data.date)
      setImageUrl(resp.data.url)
      setTitle(resp.data.title)
      setDescription(resp.data.explanation)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <main className="bg-black overflow-hidden min-h-screen flex items-center justify-center">
      {loading ? (
        <p className="text-white text-4xl font-grotesk">Cargando imagen del día...</p>
      ) : (
        <div className="max-w-[1440px] mx-auto px-36 max-sm:px-5 max-lg:px-16">
          <div className="flex flex-col gap-4 items-center my-12 max-md:mb-6">
            <p className="text-blue-700 font-grotesk font-medium">{date}</p>
            <h1 className="font-grotesk font-bold text-4xl text-white text-center leading-10 max-md:text-3xl">Astronomy Picture of the Day</h1>
            <p className="text-[#2D2D2D] font-grotesk font-medium max-sm:text-xs">Discover the cosmos through NASA's lens</p>
          </div>
          <div className="flex flex-col gap-6 mb-12">
            <img src={imageUrl} alt={title} className="rounded-lg"/>
            <div className="flex justify-between items-center max-md:flex-col gap-4">
              <p className="font-grotesk font-semibold text-white text-2xl">{title}</p>
            </div>
            <p className="text-[#E0E0E0] leading-7.25 p-6 rounded-lg bg-neutral-950 font-grotesk text-[18px]">{description}</p>
          </div>
        </div>
      )}
    </main>
  );

};

export default App;