//Get hard coded Stockholm to start with
//Conditional rendering is needed to be learnt
//Make an object to put weather state in instead of arrays

import { useRef, useState, useEffect } from "react";
import constants from "../constants/constants";
import WeatherData from "../classes/WeatherData";
import '../styles/topbar.css';
import nightImg from "../assets/nighttime.png";
import dayImg from "../assets/daytime.png";

const TopBar = (props) => {

    //style

    //state & refs
    const cityInput = useRef();
    //<input ref={cityInput}></input>
    
    const [city, setCity] = useState(props.city);
    const [weatherData, setWeather] = useState({Time: "", Img: "", Temp: ""});
    const [nightTime, setDayTime] = useState(false);
    const [todBanner, setBanner] = useState(dayImg);

    //functions
    
    useEffect(() => {
        (async function getCountryData () {
        const geoLocation = "";
                const url = `http://api.weatherapi.com/v1/current.json?key=${constants}&q=${city}`;
                return await fetch(url, {referrerPolicy: "unsafe-url"}).then(res => res.json())
                .then(res => {
                    if(res != undefined){
                        const weather = new WeatherData(res.current.last_updated, res.current.temp_c, res.current.condition.icon)
                        setWeather(weather);
                        //changeBanner();
                    }
                });
        })();
            
    }, []);

    useEffect(() => {
        changeBanner(); // Access the updated value here
    }, [weatherData]);
    
        //getCountryData();
    const changeBanner = () => {
        //it should check for it its night time
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
        </>
    )

}

export default TopBar;