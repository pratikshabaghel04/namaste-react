import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;

    const {cloudinaryImageId, name, avgRating, cuisines, costForTwo, deliveryTime } = resData?.data;
    return (
        <div 
          data-testid="resCard"
         className=" m-4 p-4 w-[250px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 rounded-lg shadow-lg bg-gray-150 hover:bg-black-200 duration-300">
        <img 
        className="rounded-lg"
         alt="res-logo" 
         src={ CDN_URL + cloudinaryImageId } />

           <h3 className="font-bold py-1 text-lg">{name}</h3>
           <h4 className=" truncate">{cuisines.join(",")}</h4>
           <span className="flex justify-stretch items-center gap-3 text-md font-bold my-3">
           <h4 className="m-1 p-1 bg-green-600 rounded-md text-white font-bold ">{avgRating} starts</h4>
           <h4>|</h4>
           <h4 className="font-medium">{costForTwo } </h4>
           </span> 
           <h4>{promoted } </h4>
        </div>
    );
};
    // Higher Order Component
export const withPromotedLable = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-1">Promoted</label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};
export default RestaurantCard;