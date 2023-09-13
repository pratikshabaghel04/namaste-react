import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if( resInfo === null) return <Shimmer />; 

    const { name, cuisines, costForTwoMessage } =
     resInfo?.cards[0]?.card?.card?.info;
     console.log(resInfo);

     const { itemCards } = 
     resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
     console.log(itemCards);

    const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    //console.log(categories);


    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl"> { name } </h1>
             <p className="font-bold text-lg">
                {cuisines} - {costForTwoMessage}
                </p>   
                  {/* categories accordions */}
                  {categories.map((category, index) => (
                   // controlled component
                      <RestaurantCategory
                        key={category?.card?.card.title}
                        data={category?.card?.card}
                        showItems={index === showIndex ? true : false}
                        setShowIndex={() => setShowIndex(index)}
                        />
                  ))}
            
           {/* <ul>
              {itemCards.map((item) => 
                <li key={item.card.info.id}>
                    {item.card.info.name} - {"Rs."}
                    {item.card.info.price / 100 || 
                     item.card.info.defaultPrice / 100} 
                </li>
             )} 
            </ul> */}
        </div>
    ); 
};
export default RestaurantMenu;