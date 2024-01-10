import { useRef, useState, useEffect, useContext } from "react";
import { apiKey, startDetailValues } from "../constants/constants";
import { CityContext } from "../contexts/ContextProvider";
import DetailUnit from "../classes/DetailUnit";


const DetailsBar = (props) => {
    
    const {city, updateCity} = useContext(CityContext);
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
                console.log(weatherDataColl);
                console.log("No spasm pls");
            }
        });
    }

    useEffect(() => {
        getCountryData();
    }, [city]);

    useEffect(() => {
        getCountryData();
            
    }, []);

    /*
        
    */

    return(
        <div>
            <p>{weatherDataColl[0]?.Date} || Max: {weatherDataColl[0]?.Max} || Min: {weatherDataColl[0]?.Min} || <img src={weatherDataColl[0]?.Img}></img></p>
            <p>{weatherDataColl[1]?.Date} || Max: {weatherDataColl[1]?.Max} || Min: {weatherDataColl[1]?.Min} || <img src={weatherDataColl[1]?.Img}></img></p>
            <p>{weatherDataColl[2]?.Date} || Max: {weatherDataColl[2]?.Max} || Min: {weatherDataColl[2]?.Min} || <img src={weatherDataColl[2]?.Img}></img></p>
            <p>{weatherDataColl[3]?.Date} || Max: {weatherDataColl[3]?.Max} || Min: {weatherDataColl[3]?.Min} || <img src={weatherDataColl[3]?.Img}></img></p>
            <p>{weatherDataColl[4]?.Date} || Max: {weatherDataColl[4]?.Max} || Min: {weatherDataColl[4]?.Min} || <img src={weatherDataColl[4]?.Img}></img></p>
        </div>

    )
}


export default DetailsBar;