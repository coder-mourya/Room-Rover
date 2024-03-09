import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";


const footer = () =>{

    return (

        <>
        <footer className="container-fluid mt-3 pt-3 pb-2 text-center text-white bg-dark custom-footer">
            <p>&copy; Room-River 2024</p>

           <ul>
           <li className="mx-5"><Link to="./About">About</Link></li>
            
            <li className="mx-5"><Link to="./ContactForm">Contact us</Link></li>
            
           </ul>

        </footer>
        </>

    )
}


export default footer;