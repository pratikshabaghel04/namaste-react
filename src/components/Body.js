import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
    // Local state variable = super powerful variable
    const [listOfRestaurants, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setFilterRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");
    
    useEffect(() => {
       fetchData();
    },[]);

    const fetchData = async () => {
        const res = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.6005075&lng=80.8322428&page_type=DESKTOP_WEB_LISTING" 
            
        );
        const jsonData = await res.json();
        console.log(jsonData);
       // console.log(json);
        // Optional Chaining
        // setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards);
        // setFilterRestaurant(json?.data?.cards[2]?.data?.data?.cards);

        setListOfRestaurant(jsonData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilterRestaurant(jsonData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
   
    return  listOfRestaurants.length === 0 ? (<Shimmer />) :  (

        <div className="body">
           <div className="filter">
           <div className="search">
            <input type="text" className="search-box" value={searchText} 
            onChange={(e) => {setSearchText(e.target.value); }}  />
            <button onClick={() => {
                // Fliter the restaurent cards and update the UI
                // searchText
                console.log(searchText);

                const filteredRestaurant = listOfRestaurants.filter(
                    (res) => res.data.name.toLowerCase().includes(searchText.toLowerCase())
                );

                setFilterRestaurant(filteredRestaurant);
            }}>
            Search
            </button>
           </div>
               <button 
               className="filter-btn"
                onClick={() => {
                const filteredList = listOfRestaurants.filter(
                    (res) => res.data.avgRating > 4
                );
                setListOfRestaurant(filteredList);
                
                 }}> Top Rated Restaurant
                 </button>
           </div>
            <div className="res-container">
               {filteredRestaurant.map((restaurants) => ( 
                <Link  key={restaurants.data.info} 
                to={"/restaurants/"+ restaurants.data.info}>
                 <RestaurantCard  resData={restaurants} /> </Link>
                 ))} 
            </div>
        </div>
    );
};
export default Body;

// "https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.6005075&lng=80.8322428&page_type=DESKTOP_WEB_LISTING"
// https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.long}&page_type=DESKTOP_WEB_LISTING