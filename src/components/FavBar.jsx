import { useRef, useState, useEffect, useContext } from "react";
import { CityContext } from "../contexts/ContextProvider";
import bin_svg from "../assets/bin.svg"
import '../styles/favbar.css';


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

    const clickFav = (event) => {
        const selectedCity = event.target.innerText;
        if(event.target instanceof HTMLDivElement || event.target instanceof HTMLParagraphElement){
            //Update city
            updateCity(selectedCity);
        } else {
            const arrData = localStorage.getItem("favArr");
            const newData = JSON.parse(arrData);
            const position = favArr.indexOf(selectedCity);
            newData.splice(position, 1);
            localStorage.setItem("favArr", JSON.stringify(newData));
            setFavArr(newData);     
        }
    }
    
    const unitMapper = () => {
        if(favArr.length === 0){
            return <p>No Favourites</p>;
        }
        return(
            <div>
                {favArr.map((town, i) => 
                    <div key={i} onClick={() => clickFav(event)} className="favComp">
                        <p style={{float: "left", color: "black"}}>{town}</p>
                        <button style={{float: "right", backgroundColor: "aquamarine"}}>
                            <img src={bin_svg} width="20px"></img>
                        </button>
                    </div>
                )}
            
            </div>
        )
    }

    return(
        <div className="favbar">
            <p style={{fontSize: "large", fontWeight: "bold"}}>My Favourites</p>
            {unitMapper()}
        </div>
    )
}

export default FavBar;