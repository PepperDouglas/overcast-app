import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import '../styles/geolocation.css'

const GeoLocator = () => {

    const { setllCoord } = useContext(CityContext);

    const getGeoData = () => {
        let longlat = [];
        const retrPos = (position) => {
            longlat[0] = parseFloat(position.coords.longitude).toFixed(5).toString();
            longlat[1] = parseFloat(position.coords.latitude).toFixed(5).toString();
            setllCoord(longlat);
            alert(longlat);
        }
        const failPos = () => {
            alert("failed");
        }
        if(navigator.geolocation){
            alert("its suppoirted!");
            navigator.geolocation.getCurrentPosition(retrPos, failPos);
        }
    }


    return(
        <>
            <button className="locateBtn" onClick={() => getGeoData()}>Locate me!</button>
        </>
    )
}

export default GeoLocator;