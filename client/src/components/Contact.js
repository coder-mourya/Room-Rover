import React, { useState } from 'react';
import axios from "axios";
import Alerts from './Alerts';


const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/contact/saveContact", {
                name,
                email,
                message,
            })


            setAlertMessage("Form submited successfully")
            setAlertType("success")
            window.location.href = "/"

        } catch (error) {
            console.log(error);
            setAlertMessage("Invalid details. Please try again.");
            setAlertType("error");
        }


    };

    return (
        <div className='container'>

            {alertMessage && (
                <Alerts message={alertMessage} type={alertType} />
            )

            }
            <h2 className="mt-5">Contact Us</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        rows={3}
                        placeholder="Enter your message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button variant="primary" type="submit" className="btn btn-primary mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
