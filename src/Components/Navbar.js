import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'  
import { useDataContext } from '../Context/Context';
import { AiOutlineSearch } from 'react-icons/ai'

const Navbar = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  const { query, setQuery, handleUnsplashSearch } = useDataContext()
  return (
    <>
      <div className='w-full h-[50vh] bg-gradient-to-r flex flex-col  items-center from-indigo-500 via-purple-500 to-pink-500 pt-24 gap-y-6'>

        <div className='md:w-[50vw] md:h-[50%] w-[90vw] h-[30%] text-center flex items-center italic lg:text-2xl text-sm underline font-bold border-2 cursor-pointer pt-2 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-25' data-aos="fade-up-right" data-aos-duration="2000"> "WE ARE THE PHOTOS FROM UNSPLASH AND PIXABAY THATS WHY WE ARE PIXSLASH"</div>

        <div className='flex justify-center gap-x-3 md:w-[50vw] h-[20%] w-[85vw] mx-auto'>

			
          <input type="search" value={query} onSubmit={(e)=>{e.preventDefault();}} onChange={(e) => { setQuery(e.target.value) }} placeholder='Search Here' className='outline-none p-1 w-[90%] rounded-lg h-[90%]' />
          <button onClick={() => { handleUnsplashSearch(); }} className='rounded-full  bg-white w-[15%] px-4  focus:outline-blue-600 h-[90%] lg:w-fit'><AiOutlineSearch /></button>


        </div>
      </div>

    </>
  )
}

export default Navbar