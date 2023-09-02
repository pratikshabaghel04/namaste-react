import RestaurantCard, {withPromotedLable} from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { RESTAURANT_API } from "../utils/constants";
import UserContext from "../utils/UserContext";


const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLable(RestaurantCard);
    
    // console.log("Body Rendered", listOfRestaurants)

     useEffect(() => {
         fetchData();
        },[]);  

       const fetchData = async () => {
        const res = await fetch(RESTAURANT_API );
        const json = await res.json();

        // optinal Chaining
        setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };  

        const onlineStatus = useOnlineStatus();
        if (onlineStatus === false)
        return (
            <div className="flex justify-center items-center mt-40">
            <h1 className="bg-orange-400 py-4 mx-8 my-4 inline-block px-6 text-xl font-semibold rounded-md"> Opps:Internet connection Issue, Please check your internet Connection</h1>
            </div>
        );

        const { loggedInUser, setUserName} = useContext(UserContext)
   
    return  listOfRestaurants.length === 0 ? (<Shimmer />) :  (

        <div className="body">
           <div className="filter flex justify-around">
           <div className="search m-4 p-4"  >
            <input 
            type="text"  
            name="search"
            id="search"
            placeholder="      Search Restaurant "
            className="border border-solid border-black rounded-md " 
            value={searchText} 
            onChange={(e) => {setSearchText(e.target.value); }} 
            />
            <button 
            className="px-4 py-1 bg-green-500 m-4 rounded-lg"
             onClick={() => {
                // Fliter the restaurent cards and update the UI
                // searchText
                // console.log(searchText);

                const filteredRestaurant = listOfRestaurants.filter(
                    (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                 setFilteredRestaurant(filteredRestaurant);
            }} > Search 
            </button>
           </div>
           {/*  filter section */}
           <div className="filter m-4 p-4 " > 
            <button 
               className="px-4 py-1 bg-orange-500 m-4 rounded-lg "
                onClick={() => {
                const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4.2
                );
                  setFilteredRestaurant(filteredList);
                
                 }}> Top Rated Restaurant
                 </button>
                 </div>
                 {/* loggedIn User */}
                 {/* <div className=" search p-4 m-4 flex items-center">
                    <label>UserName:  </label>
                    <input className="border border-black p-2 " 
                       value={loggedInUser}
                       onChange={(e) => setUserName(e.target.value)}
                       />
                 </div> */}
           </div>
            <div className="flex flex-wrap justify-center">
               {filteredRestaurant.map((restaurant) => ( 
                <Link  key={restaurant.info.id} 
                to={"/restaurants/"+ restaurant.info.id}>

                {/* add promoted lable to it, if restaurant is promoted */}
                {restaurant.info.promoted ? (<RestaurantCardPromoted  resData={restaurant} />
                ) : (
                    <RestaurantCard  resData={restaurant} />
                )}
                  </Link>
                 ))} 
            </div>
        </div>
    );
};
export default Body;

