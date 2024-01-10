import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";


const FavBar = () => {

    const {city, updateCity, favArr, setFavArr} = useContext(CityContext);
    const favsData = localStorage.getItem("favArr"); 
    const initFavsArr = favsData ? JSON.parse(favsData) : [];
    //const [favArr, setFavArr] = useState(initFavsArr);
    
    useEffect(() => {
        const storedFavs = localStorage.getItem('favArr');
        
        if (storedFavs) {
          setFavArr(JSON.parse(storedFavs));
        }
    }, []);

    
    
    
    const unitMapper = () => {
        console.log("im the storage " + favArr);
        if(favArr.length === 0){
            return <p>No favourites</p>;
        }
        return(
            <div>
                {favArr.map((town, i) => 
                    <div key={i} style={{}}>
                        <p>{town}</p>
                        <button>Bin</button>
                    </div>
                )}
            
            </div>
        )
    }

    return(
        <div>
            <p>Im favourites</p>
            {unitMapper()}
        </div>
    )
}

export default FavBar;