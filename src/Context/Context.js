import axios, { Axios } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataContextProvider({ children }) {
	const [query, setQuery] = useState("");
	const [unsplashData, setUnsplashData] = useState()
	const handleUnsplashSearch = (e) => {
		axios(`https://api.unsplash.com/search/photos?page=1&per_page=18&query=${query}&client_id=S9Q_61dooe6mjyYrSK0errdazPz6XiEfWGWLB4Zp-E4`, {
			method: 'GET'
		})
		.then((response) => {
			console.log("Query");
			console.log(response)
			setUnsplashData(response.data)
			})
			
	}

	
	
	return (
		<DataContext.Provider value={{ query, setQuery, unsplashData, setUnsplashData, pixabayData, setPixabayData, handleUnsplashSearch, handlePixabaySearch}}>
			{children}
		</DataContext.Provider>
	);
}

export function useDataContext() {
	return useContext(DataContext);
}

