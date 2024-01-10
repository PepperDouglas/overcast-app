import React, {useState, createContext} from 'react' ;

const CityContext = React.createContext();

const ContextProvider = (props) => {
    
    //City
    const updateCity = (val) =>{ setCity(val); }
    const[city, setCity] = useState('Stockholm');
    const [favArr, setFavArr] = useState([]);

    return (
        <CityContext.Provider value = {{city, updateCity, favArr, setFavArr}}>
            {props.children}
        </CityContext.Provider>
    );
}

export {
    CityContext,
    ContextProvider
}

//export default ContextProvider;