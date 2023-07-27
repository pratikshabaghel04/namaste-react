import User from "./user";
import UserClass from "./UserClass";
import React, {Component} from "react";

class About extends React.Component {

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

{/* const About = () => {
    return (
        <div>
            <h1>About</h1>
            <h2></h2>
            <UserClass name={"P (class)"} />
        </div>
    );
};
*/}

export default About;



