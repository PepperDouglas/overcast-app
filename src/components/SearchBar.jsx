import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";

const SearchBar = () => {

    const countrySearch = useRef();
    const {city, updateCity} = useContext(CityContext);
    
    const searchClick = () => {
        updateCity(countrySearch.current.value);
        console.log("Searching for" + countrySearch.current.value)
    }
    
    
    return(
        <div>
            <p>Search for a city</p>
            <input ref={countrySearch}></input>
            <button onClick={searchClick}>Search</button>
        </div>
    )
}

export default SearchBar;
