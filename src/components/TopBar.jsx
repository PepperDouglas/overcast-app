import { useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import { apiKey } from "../constants/constants";
import DetailsBar from "./DetailsBar";
import WeatherData from "../classes/WeatherData";
import SearchBar from "./SearchBar";
import FavBar from "./FavBar";
import nightImg from "../assets/nighttime.png";
import dayImg from "../assets/daytime.png";
import '../styles/topbar.css';

const TopBar = ({cityprop}) => {

    const {city, updateCity, setFavArr, longlatcoord, tempCity, isDetailsShown, setShowDetails} = useContext(CityContext);
    const [weatherData, setWeather] = useState({Time: "", Img: "", Temp: ""});
    const [todBanner, setBanner] = useState(dayImg);

    useEffect(() => {
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
    }, [longlatcoord]);

    //functions
    async function getCountryData (param) {
        if(param == "" || param === undefined){
            return;
        }
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
                updateCity(res.location.name);
            }
        }).catch((error) => {
            console.log("City not found. " + error);
        })
    }

    const changeBanner = () => {
        weatherData.Img.includes("night") ? setBanner(nightImg) : setBanner(dayImg);
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
                console.log("Already added this city");
                return;
            }
            newData.push(newCity);
            localStorage.setItem("favArr", JSON.stringify(newData));
            setFavArr(newData);
        }
    }

    const invertDetails = (event) => {
        if(isDetailsShown){
            event.target.innerText = "See Details";
            setShowDetails(false);
        } else {
            event.target.innerText = "Hide Details";
            setShowDetails(true);
        }
    }

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
}

export default TopBar;