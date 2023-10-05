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
        const res = await fetch(RESTAURANT_API);
        const json = await res.json();
        setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };
    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
      return (
       <div className="flex justify-center items-center">
        <h1 className="bg-orange-400 py-4 mx-8 my-28 inline-block px-6 text-xl font-semibold rounded-md">
          Looks like you're offline!! Please check your internet connection;
        </h1>
        </div>
      );   
       const { loggedInUser, setUserName} = useContext(UserContext)
       console.log(listOfRestaurants); 
       
         return listOfRestaurants.length === 0 ?  (<Shimmer />) : (

        <div className="body">
           <div className="flex justify-around">
            {/*  Search Restaurant */}
           <div className="search m-4 p-6">
            <input type="text" 
            placeholder="   Search Restaurant"
            data-testid="searchInput"
            className="border border-solid border-black"
            value={searchText} 
            onChange={(e) => {setSearchText(e.target.value); 
            }}  />
            <button 
             className="px-4 py-2 bg-green-400 m-4 rounded-lg"
            onClick={() => {
                // Fliter the restaurent cards and update the UI
                // searchText
                // console.log(searchText);

                const filteredRestaurant = listOfRestaurants.filter(
                    (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );

                setFilteredRestaurant(filteredRestaurant);
            }}>
            Search
            </button>
           </div>
           {/*  filter Reataurant */}
                <div  className="m-4 p-4 flex items-center">
               <button 
               className=" px-4 py-2 bg-orange-500 rounded-lg"
                onClick={() => {
                const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4
                );
                //setListOfRestaurants(filteredList);
                setFilteredRestaurant(filteredList);
                 }}> Top Rated Restaurant
                 </button>
                 </div>
                   {/* <div className="search m-4 p-4 flex items-center">
                  <label>UserName : </label>
                  <input
                    className="border border-black p-2"
                    value={loggedInUser}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                 </div>  */}
           </div>
            <div className="flex flex-wrap m-15 justify-center">
               {filteredRestaurant.map((restaurant) => ( 
                <Link  key={restaurant?.info.id} 
                to={"/restaurants/"+ restaurant?.info.id}>

                {restaurant?.info.promoted ? (
                 <RestaurantCardPromoted resData={restaurant?.info} />
                      ) : (
                 <RestaurantCard  resData={restaurant?.info} />
                     )}
                    </Link>
                 ))} 
            </div>
        </div>
     );
};
export default Body;
