import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useDataContext } from '../Context/Context';
import Modal from './Modal';
import { AiOutlineDownload } from 'react-icons/ai'
import { FcLike } from 'react-icons/fc';

const Unsplash = () => {
    const [Image, setImage] = useState([]);
    const [modal, setModal] = useState({ show: false, data: {} })
    const { query, unsplashData } = useDataContext()
    useEffect(() => {
        //   let YOUR_ACCESS_KEY = 'IasqYspELby9PEyj9XMQ0eDMxdHroHWKoARnupg2aHI'

        axios(`https://api.unsplash.com/photos?page=1&per_page=18&client_id=IasqYspELby9PEyj9XMQ0eDMxdHroHWKoARnupg2aHI`, {
            method: "GET"

        })
            .then((response) => {
        

                setImage(response.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])
    const download = (e, data1) => {
        console.log(e);
        fetch(e, data1,{
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    // link.setAttribute("download", `${unsplashData.data.user.name.split(" ").join("-").toLowerCase()}-${data.id}.jpg`); //or any other extension
                    link.setAttribute("download", 'image.jpg'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            {modal.show && <Modal data={modal.show && modal?.data} setModal={setModal} />}


            {/* <Link to="/black"  ><button className='rounded-xl bg-black w-fit p-2 focus:w-32'>Unsplash</button> </Link> */}
            <div className='md:p-4  px-1'>
                <div className='w-fit md:grid md:grid-cols-3 md:gap-6 md:p-4 mx-auto md:border-2 border-slate-200 rounded-lg grid gap-y-5'>

                    {
                        query.length !== 0 && unsplashData ?
                            unsplashData.results?.map((value, index) => {
                                return (<div className='py-6 md:py-0' key={index}>
                                    {<div onClick={() => { setModal({ show: true, data: value }) }} className="max-w-sm  bg-white  md:border-hidden border border-gray-200 rounded-lg  "  >
                                        <div className='md:hidden block'> <a href={value.user.links.html} target="_blank" className='flex ' >@ <p className='text-blue-600'>{value.user.name}</p></a></div>

                                        <img className="rounded-lg shadow cursor-pointer hover:shadow-xl md:hover:scale-105 duration-300" title='Click to view more' src={value.urls.small} alt="" />


                                        <div className='block md:hidden px-4 pt-1'>

                                            <div className='flex justify-between h-fit '>
                                                <p className='flex w-full text-xl items-center'> {value.likes} <FcLike className=' h-9 pb-1' /> </p>
                                                <button className='flex border-2 border-slate-400 py-1 px-3 rounded-md ' onClick={() => { download(value.urls.raw)  } } > Download <AiOutlineDownload className='mt-1 mx-1 ' /> </button>
                                            </div>

                                        </div>
                                    </div>}
                                </div>
                                )


                            })
                            :
                            Image?.map((value, index) => {
                                return (<div className='py-6 md:py-0' key={index}>
                                    {<div onClick={() => { setModal({ show: true, data: value }) }} className="max-w-sm  bg-white  md:border-hidden border border-gray-200 rounded-lg     "  >
                                        <div className='md:hidden block'> <a href={value.user.links.html} target="_blank" className='flex ' >@ <p className='text-blue-600'>{value.user.name}</p></a></div>

                                        <img className="rounded-lg shadow cursor-pointer hover:shadow-xl md:hover:scale-105 duration-300" title='Click to view more' src={value.urls.small} alt="" />


                                        <div className='block md:hidden px-4 pt-1'>

                                            <div className='flex justify-between h-fit '>
                                                <p className='flex w-full text-xl items-center'> {value.likes} <FcLike className=' h-9 pb-1' /> </p>
                                                <button className='flex border-2 border-slate-400 py-1 px-3 rounded-md ' onClick={() => { download(value.urls.raw ) }}  > Download <AiOutlineDownload className='mt-1 mx-1 ' /> </button>
                                            </div>

                                        </div>
                                    </div>}
                                </div>
                                )


                            })
                    }

                </div>
            </div>
        </>
    )
}
export default Unsplash;