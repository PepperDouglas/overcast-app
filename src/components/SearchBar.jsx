import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import GeoLocator from "./GeoLocation";
import '../styles/searchbar.css'

const SearchBar = () => {

    const countrySearch = useRef();
    const {city, updateCity, setTempCity} = useContext(CityContext);
    
    const searchClick = () => {
        //updateCity(countrySearch.current.value);
        setTempCity(countrySearch.current.value);
        //instead of updating city here, maybe do a search first to see if it exists
    }
    
    
    return(
        <div className="searchBar">
            <p style={{fontSize: "large", fontWeight: "bold"}}>Search for a city</p>
            <input ref={countrySearch}></input>
            <button onClick={searchClick}>Search</button>
            <GeoLocator></GeoLocator>
        </div>
    )
}

export default SearchBar;
