import React, { useState } from 'react'
import { AiOutlineClose, } from 'react-icons/ai'
import { FcLike } from 'react-icons/fc'
import {AiOutlineDownload} from 'react-icons/ai'

const Modal = ({ data, setModal }) => {
	const [downloadQuality, setDownloadQuality] = useState()

if(data.alt_description){
	data.alt_description = data.alt_description
}
else{
	data.alt_description = "No Description Available "
}
	if (data.description === null) {
		data.description = data.alt_description
	}

	if (data.downloads) {
		data.downloads = data.downloads
	}
else{
	data.downloads = "No  info"
}
	const download = e => {
		// console.log(e);
		fetch(e, {
			method: "GET",
			headers: {}
		})
			.then(response => {
				response.arrayBuffer().then(function (buffer) {
					const url = window.URL.createObjectURL(new Blob([buffer]));
					const link = document.createElement("a");
					link.href = url;
					link.setAttribute("download", `${data.user.name.split(" ").join("-").toLowerCase()}-${data.id}.jpg`); //or any other extension
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
			<div className='hidden md:block'>
			<div  className=' h-screen w-screen backdrop-blur-xl flex items-center justify-center fixed  top-0 left-0  shadow-lg z-[100] '>

<div className='relative md:h-[90vh] h-[96vh] overflow-auto w-[90vw] pb-5 bg-white rounded-lg flex items-center flex-col justify-center  md:gap-y-8 md:pt-[17rem] gap-y-16'>
	
	<button onClick={() => { setModal({ show: false }) }} className="absolute top-1 right-2 font-bold text-2xl text-red-600" title='close'><AiOutlineClose /></button>
	
	<div className='absolute right-2 top-12 space-y-3 border p-2 w-[17%] hidden md:block' >
		<button onClick={() => { download(data.urls.raw  ) }} className="border-2 border-black p-1 rounded-md flex text-sm"><AiOutlineDownload className='mt-1 mx-1 '/> Download High Quality</button>
		<button onClick={() => { download(data.urls.full) }} className="border-2 border-black p-1 rounded-md flex text-sm"><AiOutlineDownload className='mt-1 mx-1 '/> Download Bit Low</button>
		</div>

		
	<div className='md:block hidden  h-[85vh]  w-[50vw] '>
		<img src={data.urls.regular} className="h-[100%] rounded-lg mx-auto" alt="" />
	
	</div>
	<div className='md:hidden block  h-[85vh]  w-[95%] pt-16'>
		<img src={data.urls.regular} className=" rounded-sm mx-auto" alt="" />
		<div className='space-y-3 border p-2 flex flex-col justify-between items-center' >
		<button onClick={() => { download(data.urls.raw  ) }} className="border-2 border-black p-1 rounded-md flex text-sm w-fit"><AiOutlineDownload className='mt-1 mx-1 '/> Download High Quality</button>
		<button onClick={() => { download(data.urls.full) }} className="border-2 border-black p-1 rounded-md flex text-sm w-fit"><AiOutlineDownload className='mt-1 mx-1 '/> Download Bit Low</button>
		</div>
	</div>


	<div className=' text-black border-black border rounded-md p-2 w-[90%]'>
	<h1 className='font-bold'>Photo Details:-</h1>
		<p>Photo Description: {data.description}</p>
		<p className='flex'> Total Likes: {data.likes} <FcLike /> </p>
		<p>Total Downloads: {data.downloads}</p>
		<hr className='border' />
		<h1 className='font-bold'>Photographer Details:-</h1>
		<p>Name: {data.user.name}</p>
		<p>UserName: {data.user.username}</p>
		<a href={data.user.links.html} target="_blank"><button className='text-black border-2 border-black p-1 rounded-md px-4'>Profile</button></a>
		
	</div>
</div>



</div>
			</div>
		</>
	)
}

export default Modal