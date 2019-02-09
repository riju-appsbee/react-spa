import React from 'react';
import {Link} from "react-router-dom";

export default function Unauth(){
    //Clear all storages and provide the link to log in
    localStorage.clear();
    sessionStorage.clear();
    return(
        <div className="page-404">
        <p className="text-404">404</p>
        <h2>Aww Snap!</h2>
        <p>Something went wrong or that page doesn’t exist yet. <br /><Link to={'/login'}>Return Home</Link></p>
    </div>)    
}