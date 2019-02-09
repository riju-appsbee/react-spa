import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Logout extends Component{
        
        componentDidMount(){
            document.body.style.background = "#dff8e3";
        }

        componentWillUnmount(){
            document.body.style.background = "";
        }
        
        render(){
        localStorage.clear();
        sessionStorage.clear();
        
        return(
            <div className="container">
            <div className="text-center alert alert-success" style={{margin: "200px auto 0"}}>
            <strong>
            You have successfully Logged out from this application.<Link to="/login">Click here</Link> to login again!
            </strong>
            </div>
            </div>
        )
        };
};