//Get hard coded Stockholm to start with
//Conditional rendering is needed to be learnt
//Make an object to put weather state in instead of arrays

import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import DetailsBar from "./DetailsBar";
import { capitaliseFirstLetter } from "../functions/searchFunct";
import { apiKey } from "../constants/constants";
import WeatherData from "../classes/WeatherData";
import '../styles/topbar.css';
import nightImg from "../assets/nighttime.png";
import dayImg from "../assets/daytime.png";
import SearchBar from "./SearchBar";
import FavBar from "./FavBar";

const TopBar = ({cityprop}) => {

    //style

    //state & refs


    const {city, updateCity, favArr, setFavArr, longlatcoord, tempCity, isDetailsShown, setShowDetails} = useContext(CityContext);
    //const [city, setCity] = useState(props.city);
    const [weatherData, setWeather] = useState({Time: "", Img: "", Temp: ""});
    const [nightTime, setDayTime] = useState(false);
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [todBanner, setBanner] = useState(dayImg);

    //functions
    async function getCountryData (param) {
        if(param == "" || param === undefined){
            return;
        }
        const geoLocation = "";
        console.log(param);
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${param}`;
        return await fetch(url, {referrerPolicy: "unsafe-url"}).then(res => {
            if(!res.ok){
                throw new Error("Bad Request");
            }
            return res.json();
        })
        .then(res => {
            if(res != undefined){

                const weather = new WeatherData(res.current.last_updated, res.current.temp_c, res.current.condition.icon)
                setWeather(weather);
                updateCity(capitaliseFirstLetter(res.location.name));
            }
        }).catch((error) => {
            console.log("City not found." + error);
        })
    }

    useEffect(() => {
        //here we could choose to use saved locale instead on load
        console.log("Initial mounting!");
        
            //setFirstLoad(false);
            getCountryData(cityprop);
        

    }, []);
    
    useEffect(() => {
        changeBanner();
    }, [weatherData]);

    useEffect(() => {
        getCountryData(tempCity);
    }, [tempCity]);

    useEffect(() => {
        getCountryData(longlatcoord);
    }, [longlatcoord])
    
        //getCountryData();
    const changeBanner = () => {
        //it should check for it its night time
        //Maybe check data weather_descriptions instead of if night is in url
        weatherData.Img.includes("night") ? setBanner(nightImg) : setBanner(dayImg);
        //this one sets the css!
        //console.log("Is it night?" + nightTime);
    }
    
    const addFavs = () => {
        const arrData = localStorage.getItem("favArr");
        const newCity = city;
        if (arrData === null){
            localStorage.setItem("favArr", JSON.stringify([newCity]));
            setFavArr([newCity]);
        } else {
            const newData = JSON.parse(arrData);
            if (newData.includes(newCity)){
                console.log("already added this city")
                return;
            }
            newData.push(newCity);
            localStorage.setItem("favArr", JSON.stringify(newData));
            setFavArr(newData);
        }
    }

    const invertDetails = (event) => {
        //alert(event.target.innerText);
        if(isDetailsShown){
            event.target.innerText = "See Details";
            setShowDetails(false);
        } else {
            event.target.innerText = "Hide Details";
            setShowDetails(true);
        }
    }

    //wash data

    //mapping
    

    //main return

    return(
        <div className="topbarContainer">
            <div className="maindiv" style={{backgroundImage: `url(${todBanner})`}}>
                <div className="subdiv">
                    <p className="cityP">
                        {city}
                    </p>
                    <p className="pData">
                        Temperature: {weatherData.Temp}°C, {weatherData.Time}
                    </p>
                    <p>
                        <img src={weatherData.Img} style={{width: "15%", backgroundColor: "white", borderRadius: "10%", border: "2px solid black"}}></img>
                    </p>
                    <button onClick={() => invertDetails(event)} style={{marginRight: "1%", marginBottom: "1%"}}>See Details</button>
                    <button onClick={addFavs} style={{marginLeft: "1%", marginBottom: "1%"}}>Add Favorites</button>
                </div>
            </div>
            <div className="bottomData">
                <SearchBar></SearchBar>
                <DetailsBar city={city}></DetailsBar>
                <FavBar></FavBar>
            </div>
        </div>
    )
        //SearchBar is not really supposed to be here, but wuth context it makes sense from a design perspective. But not from a logical one!
}

export default TopBar;