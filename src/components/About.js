import User from "./user";
// import UserClass from "./UserClass";
import React, {Component} from "react";
import food from "../../images/burger-image.png"
import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from "../utils/constants";
import {SiGithub, SiLinkedin, SiTwitter} from "react-icons/si"

 {/*class About extends React.Component {
        constructor(props) {
          super(props);
            // console.log(" parent constructor")
        }
        componentDidMount() {
           // console.log("Parent component did mount")
        }
    render () {
       // console.log("parent render")
        return (
            <div>
                <h1>About Class component </h1>
                <h2></h2>
                <UserClass name={"P (class)"} />
            </div>
        );
    }
}
*/}

 const About = () => {
    return (
      <div>
        <div className="about-container flex gap-4 justify-around">
             <div className=" flex flex-col mt-28 gap-2">
              <h1 className=" font-bold text-2xl m-4 text-center ">About Me</h1>
              <div className="text-4xl p-4 gap-4 flex mt-2">
            
                <a href={GITHUB_LINK}  className="mb-2 pr-4 hover:scale-105"
              target="_blank">  <i className="bg-[#333] icon--i">
                <SiGithub className="m-auto" />
              </i></a>

              <a href={LINKEDIN_LINK}  className="mb-2 pr-4 hover:scale-105"
              target="_blank">  <i className="bg-[#333] icon--i">
                <SiLinkedin className="m-auto" />
              </i></a>

              <a href={TWITTER_LINK}  className="mb-2 pr-4 hover:scale-105"
              target="_blank">  <i className="bg-[#333] icon--i">
                <SiTwitter className="m-auto" />
              </i></a>
              </div>
              
            </div>  
             <div className="about-left mt-28 mb-8">
                <img src={food} alt="Food Image" />
              </div>
              
           

        </div>
                  {/* <UserClass name={"P (class)"} /> */} 
      </div>
    );
};


export default About;



