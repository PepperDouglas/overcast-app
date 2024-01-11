import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import '../styles/searchbar.css'

const SearchBar = () => {

    const countrySearch = useRef();
    const {city, updateCity} = useContext(CityContext);
    
    const searchClick = () => {
        updateCity(countrySearch.current.value);
        console.log("Searching for" + countrySearch.current.value)
    }
    
    
    return(
        <div className="searchBar">
            <p style={{fontSize: "large", fontWeight: "bold"}}>Search for a city</p>
            <input ref={countrySearch}></input>
            <button onClick={searchClick}>Search</button>
        </div>
    )
}

export default SearchBar;
