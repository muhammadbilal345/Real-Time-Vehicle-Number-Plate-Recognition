import React, { useState } from "react";
import "./ContactStyle.css";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Map from "./Map";

const ContactUs = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    contact_no: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const contact_t = () => {
    // Perform form validation
    const validationErrors = {};

    if (!contact.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!contact.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!contact.contact_no.trim()) {
      validationErrors.contact_no = "Contact number is required";
    } else if (!/^\d{10}$/.test(contact.contact_no)) {
      validationErrors.contact_no = "Invalid contact number format";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:9002/contact", contact)
        .then((res) => alert(res.data.message))
        .catch((error) => console.error(error));

      // Reset the form
      setContact({
        name: "",
        email: "",
        contact_no: "",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact">
            <h2>Contact Us</h2>
            <input
              type="text"
              name="name"
              value={contact.name}
              placeholder="Your Name"
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
            <input
              type="text"
              name="email"
              value={contact.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
            <input
              type="text"
              name="contact_no"
              value={contact.contact_no}
              placeholder="Phone Number"
              onChange={handleChange}
            />
            {errors.contact_no && <span>{errors.contact_no}</span>}
            <div className="button" onClick={contact_t}>
              Contact Us
            </div>
          </div>

      
      <Footer />
    </>
  );
};

export default ContactUs;
