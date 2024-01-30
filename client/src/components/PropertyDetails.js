import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyDetails = () => {

    const [property, setPropertyDetails] = useState([]);
    const [User, setUserDetails]  = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/properties");
                setPropertyDetails(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        const getUser = async () =>{
            try {
                const response = await axios.get("http://localhost:5000/auth/users");
                setUserDetails(response.data.data);
            } catch (error) {
                 console.log(error);
            }
        }

        getUser();
    }, [])

    return (

        <>
            <div className="container text-center mt-5">

                <div className="row">
                    {
                        property.map((property) => {

                            return (
                                <div key={property._id} className="col-md-6">

                                    <h2>{property.owner}</h2>
                                    <p>{property.description} </p>

                                    <h3>{User.map((User) => {
                                        return (

                                            <p key= {User._id}>{User.number}</p>
                                        )
                                    })}</h3>

                                </div>

                            )

                        })
                    }

                </div>
            </div>
        </>
    )
}

export default PropertyDetails;