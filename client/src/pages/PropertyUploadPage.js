import React from "react";
import { Link } from "react-router-dom";

const propertyuploadPage = () => {
  return (
    <>
      <div className="container">

        <h2>upload the property here...</h2>
        <p>if you are a owner can upload property

        </p>
        <button className="btn btn-primary ">

          <Link to="/PropertyForm" className="text-white text-decoration-none"> upload</Link>
        </button>
      </div>
    </>
  )
}

export default propertyuploadPage;