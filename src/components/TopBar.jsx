//Get hard coded Stockholm to start with
//Conditional rendering is needed to be learnt
//Make an object to put weather state in instead of arrays

import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import DetailsBar from "./DetailsBar";
import { apiKey } from "../constants/constants";
import WeatherData from "../classes/WeatherData";
import '../styles/topbar.css';
import nightImg from "../assets/nighttime.png";
import dayImg from "../assets/daytime.png";
import SearchBar from "./SearchBar";

const TopBar = (props) => {

    //style

    //state & refs


    const {city, updateCity} = useContext(CityContext);
    //const [city, setCity] = useState(props.city);
    const [weatherData, setWeather] = useState({Time: "", Img: "", Temp: ""});
    const [nightTime, setDayTime] = useState(false);
    const [todBanner, setBanner] = useState(dayImg);

    //functions
    async function getCountryData () {
        const geoLocation = "";
                const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
                return await fetch(url, {referrerPolicy: "unsafe-url"}).then(res => res.json())
                .then(res => {
                    if(res != undefined){
                        const weather = new WeatherData(res.current.last_updated, res.current.temp_c, res.current.condition.icon)
                        setWeather(weather);
                        //changeBanner();
                    }
                });
        }

    useEffect(() => {
        getCountryData();
            
    }, []);

    useEffect(() => {
        changeBanner(); // Access the updated value here
    }, [weatherData]);

    useEffect(() => {
        getCountryData();
    }, [city]);
    
        //getCountryData();
    const changeBanner = () => {
        //it should check for it its night time
        //Maybe check data weather_descriptions instead of if night is in url
        weatherData.Img.includes("night") ? setBanner(nightImg) : setBanner(dayImg);
        //this one sets the css!
        //console.log("Is it night?" + nightTime);
        console.log(todBanner);
    }
    

    //wash data

    //mapping
    

    //main return

    return(
        <>
            <div className="maindiv" style={{backgroundImage: `url(${todBanner})`}}>
                <div className="subdiv">
                    <p>
                        This is some weather data for {city}
                    </p>
                    <p>
                        Temperature: {weatherData.Temp} C, Time: {weatherData.Time}
                    </p>
                    <p>
                        <img src={weatherData.Img}></img>
                    </p>
                    <button>See details</button>

                </div>
            </div>
            <div style={{flex: "wrap"}}>
                <SearchBar style={{float: "left"}}></SearchBar>
                <DetailsBar city={city}></DetailsBar>
            </div>
        </>
    )
        //SearchBar is not really supposed to be here, but wuth context it makes sense from a design perspective. But not from a logical one!
}

export default TopBar;