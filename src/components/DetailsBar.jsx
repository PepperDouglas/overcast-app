import { useRef, useState, useEffect, useContext } from "react";
import { apiKey, startDetailValues } from "../constants/constants";
import { CityContext } from "../contexts/ContextProvider";
import DetailUnit from "../classes/DetailUnit";
import '../styles/detailsbar.css';


const DetailsBar = (props) => {
    
    const {city, updateCity, isDetailsShown, setShowDetails} = useContext(CityContext);
    const [weatherDataColl, setWeatherColl] = useState([]);

    async function getCountryData () {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&alerts=no&aqi=no`;
        return await fetch(url, {referrerPolicy: "unsafe-url"}).then(res => res.json())
        .then(res => {
            if(res != undefined){
                let newData = [];
                for (let i = 0; i < 5; i++){  
                    //So, how is this loop set here? Do we need a seperate function or what?  
                    (function(i){
                        let datablock = new DetailUnit(res.forecast.forecastday[i].date, res.forecast.forecastday[i].day.maxtemp_c, 
                            res.forecast.forecastday[i].day.mintemp_c, res.forecast.forecastday[i].day.condition.icon)                       
                        //setWeatherColl([...weatherDataColl, datablock]);
                            newData.push(datablock);
                    })(i);
                    
                    
                }
                setWeatherColl(newData);
                console.log("No spasm pls");
            }
        });
    }

    useEffect(() => {
        getCountryData();
    }, [city]);

    
    /*
    useEffect(() => {
        getCountryData();
            
    }, []);
        
    */

    if(isDetailsShown){
        return(
            <div className="detailsContainer">
                <div className="detailsUnit"><p className="detailText">{weatherDataColl[0]?.Date}</p><div className="minMaxDiv"><p>Max: {weatherDataColl[0]?.Max}</p><p>Min: {weatherDataColl[0]?.Min}</p></div> <img src={weatherDataColl[0]?.Img}></img></div>
                <span style={{color: "grey"}}>a</span>
                <div className="detailsUnit"><p className="detailText">{weatherDataColl[1]?.Date}</p><div className="minMaxDiv"><p>Max: {weatherDataColl[1]?.Max}</p><p>Min: {weatherDataColl[1]?.Min}</p></div> <img src={weatherDataColl[1]?.Img}></img></div>
                <span style={{color: "grey"}}>a</span>
                <div className="detailsUnit"><p className="detailText">{weatherDataColl[2]?.Date}</p><div className="minMaxDiv"><p>Max: {weatherDataColl[2]?.Max}</p><p>Min: {weatherDataColl[2]?.Min}</p></div> <img src={weatherDataColl[2]?.Img}></img></div>
                <span style={{color: "grey"}}>a</span>
                <div className="detailsUnit"><p className="detailText">{weatherDataColl[3]?.Date}</p><div className="minMaxDiv"><p>Max: {weatherDataColl[3]?.Max}</p><p>Min: {weatherDataColl[3]?.Min}</p></div> <img src={weatherDataColl[3]?.Img}></img></div>
                <span style={{color: "grey"}}>a</span>
                <div className="detailsUnit"><p className="detailText">{weatherDataColl[4]?.Date}</p><div className="minMaxDiv"><p>Max: {weatherDataColl[4]?.Max}</p><p>Min: {weatherDataColl[4]?.Min}</p></div> <img src={weatherDataColl[4]?.Img}></img></div>
            </div>
    
        )
    } else {
        return(
            <div className="detailsContainer"></div>
        )
    }
}


export default DetailsBar;