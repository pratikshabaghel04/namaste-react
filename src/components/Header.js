import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login")
    console.log("Header Reander");

    useEffect(() => {
        console.log("UseEffect Called")
    }, [btnNameReact]);


    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" 
                src={LOGO_URL} />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <button 
                    className="Login" 
                    onClick={() => {
                        btnNameReact === "Login"?
                    setBtnNameReact("Logout"):setBtnNameReact("Login")
                    }}
                    >
                    {btnNameReact}
                    </button>
                </ul>
            </div>
        </div>
    );
};
export default Header;