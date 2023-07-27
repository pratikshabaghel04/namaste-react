import React, { Component } from "react";
import { json } from "react-router-dom";

class UserClass extends React.Component {
    constructor(props) {
      super(props);
    
      this.state = {
        userInfo: {
            name: "Dummy",
            location: "Satna",
        }
      };
       console.log(this.props.name + "Child Constructor")
    };
     async componentDidMount() {
       // console.log(this.props.name + "child component did mount");
       const data = await fetch("https://api.github.com/users/pratikshabaghel04");
       const json = await data.json();

       this.setState({
        userInfo: json,
       });

       console.log("json")
    }

        componentDidUpdate() {
            console.log("component did update");
        }

        componentWillUnmount(){
            console.log("component will update")
        }

    render () {
       
         // console.log(this.state.name + "child render");

         const { name, location} = this.state.userInfo;

        return (
            <div className="user-card">
            <h2>Name:{this.state.userInfo.name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact:</h4>
            </div>
        );
    }; 
};
export default UserClass;