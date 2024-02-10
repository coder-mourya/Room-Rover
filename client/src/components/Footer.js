import React from "react";
import "./footer.css";

const footer = () =>{

    return (

        <>
        <div className="container-fluid mt-3 pt-3 pb-2 text-center text-white bg-dark">
            <p>&copy; Room-River 2024</p>

           <ul>
            <li className="mx-5"><a href="./About">About</a></li>
            <li className="mx-5">Contact us</li>
           </ul>

        </div>
        </>

    )
}


export default footer;