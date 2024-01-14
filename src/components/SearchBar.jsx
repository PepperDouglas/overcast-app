import { useRef, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import GeoLocator from "./GeoLocation";
import '../styles/searchbar.css'

const SearchBar = () => {

    const countrySearch = useRef();
    const {setTempCity} = useContext(CityContext);
    
    const searchClick = () => {
        setTempCity(countrySearch.current.value);
    }
    
    return(
        <div className="searchBar">
            <p style={{fontSize: "large", fontWeight: "bold"}}>Search for a city</p>
            <div className="searchBarContents">
                <input ref={countrySearch} style={{backgroundColor: "white", color: "black"}} placeholder="Enter a city..."></input>
                <button className="searchButton" onClick={searchClick}>Search</button>
                <GeoLocator></GeoLocator>
            </div>
        </div>
    )
}

export default SearchBar;
