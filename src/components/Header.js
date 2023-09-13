import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from 'react-redux'


const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login")

    const onlineStatus = useOnlineStatus();
    
    //show user login
    const {loggedInUser} = useContext(UserContext);
    //console.log(loggedInUser);

    // Subscribing to the store using a selector
    const cartItems = useSelector((store) => store.cart.items);
    //console.log(cartItems);

    return (
        <div className="flex justify-between h-28 bg-white-100 shadow-lg">
            <div className="logo-container">
                <img className="w-36" 
                src={LOGO_URL} />
            </div>
            <div className="nav-items-center">
                <ul className=" flex p-5 m-4">
                    <li className="px-4 m-2 font-bold  text-lg border-b-2 border-green-500 border-opacity-0 hover:text-green-500 duration-200 cursor-pointer shadow-current  "> 
                    <Link to="/">Home</Link>
                    </li>
                    <li className="px-4 m-2 font-bold  text-lg border-b-2 border-green-500 border-opacity-0 hover:text-green-500 duration-200 cursor-pointer shadow-current ">
                    <Link to="/about">About </Link>
                    </li>
                    <li className="px-4 m-2 font-bold  text-lg border-b-2 border-green-500 border-opacity-0 hover:text-green-500 duration-200 cursor-pointer shadow-current  "> 
                    <Link to="/contact">Contact </Link>
                    </li>
                    {/* <li className="px-4 "> 
                    <Link to="/grocery">Grocery</Link>
                    </li> */}
                    <li className="px-4 m-2 font-bold text-lg">
                    <Link to="/cart">Cart({cartItems.length} items)</Link>
                    </li>
                    <li className="whitespace-nowrap px-4 m-2 font-bold  bg-black text-blue-500 rounded-lg text-lg cursor-default">
                        {onlineStatus ? "✅" + "Online" : "🔴" + "Offline"}  
                    </li> 
                    {/* max-sm:mx-2 p-1 md:px-2.5 md:py-1.5 lg:px-5 lg:py-2.5 */}
                    <button 
                    className="Login px-4 m-2  text-lg font-bold" 
                    onClick={() => {
                        btnNameReact === "Login"?
                    setBtnNameReact("Logout"):setBtnNameReact("Login")
                    }}
                    >
                    {btnNameReact}
                    </button>
                    {/* <li className="px-4 font-bold">{loggedInUser} </li> */}
                </ul>
            </div>
        </div>
    );
};
export default Header;

