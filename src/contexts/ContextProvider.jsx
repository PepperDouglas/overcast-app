import {useState, createContext} from 'react' ;

const CityContext = createContext();

const ContextProvider = (props) => {
    
    const updateCity = (val) =>{ setCity(val); }
    const[city, setCity] = useState('Stockholm');
    const[tempCity, setTempCity] = useState();
    const [favArr, setFavArr] = useState([]);
    const [longlatcoord, setllCoord] = useState([]);
    const [isDetailsShown, setShowDetails] = useState(false);

    return (
        <CityContext.Provider value = {{city, updateCity, favArr, setFavArr, longlatcoord, setllCoord, tempCity, setTempCity, isDetailsShown, setShowDetails}}>
            {props.children}
        </CityContext.Provider>
    );
}

export {
    CityContext,
    ContextProvider
}