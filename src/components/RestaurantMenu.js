import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
         fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch( "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=");

        const json = await data.json();

        console.log(json);
        setResInfo(json.data);
    };

    if( resInfo === null) return <Shimmer />; 

    const { name, cuisines, costForTwoMessage } =
     resInfo?.cards[0]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULER?.cards[1]?.card?.card;

     console.log(itemCards);

    return (
        <div className="menu">
            <h1> { name } </h1>
             <p>{cuisines.json(",")} - {costForTwoMessage}</p> 
             <h2>Menu</h2> 
            <ul>
             {itemCards.map((item) => {
                <li key={item.card.info.name}>
                    {item.card.info.name} - {"Rs."}
                    {item.card.info.price / 100 }
                </li>
             })}
            </ul>
        </div>
    ); 
};
export default RestaurantMenu;

