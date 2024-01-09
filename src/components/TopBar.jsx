//Get hard coded Stockholm to start with

const TopBar = () => {

    //style

    //state & refs
    const cityInput = useRef();

    //functions
    const getCountryData = () => {
        const geoLocation = "";
        const url = `https://api.weatherstack.com/current?access_key=${YOUR_ACCESS_KEY}&query=${city}`;
        return(
            <div>
                this is some weather data
            </div>
        )
    
    }

    //mapping


    //main return

    return(
        <>
            <input ref={cityInput}></input>
            <button onClick={getCountryData}></button>
            {getCountryData()}
        </>
    )

}

export default TopBar;