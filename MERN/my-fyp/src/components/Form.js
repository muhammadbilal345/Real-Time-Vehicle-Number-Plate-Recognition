// import React, { useState } from "react";

// const ContactForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact_no, setContact_no] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Perform form validation
//     const validationErrors = {};

//     if (!name.trim()) {
//       validationErrors.name = "Name is required";
//     }

//     if (!email.trim()) {
//       validationErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       validationErrors.email = "Invalid email format";
//     }

//     if (!contact_no.trim()) {
//       validationErrors.contact_no = "Contact number is required";
//     } else if (!/^\d{10}$/.test(contact_no)) {
//       validationErrors.contact_no = "Invalid contact number format";
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//         try {
//             // Send form data to the backend API
//             const response =  axios.post("/api/contact", {
//               name,
//               email,
//               contactNo,
//             });
    
//             // Handle the response from the API
//             if (response.data.message === "Successfully Submitted.") {
//               // Reset the form and clear errors
//               setName("");
//               setEmail("");
//               setContactNo("");
//               setErrors({});
//             } else {
//               // Handle any other error scenarios from the API
//               // Display appropriate error messages to the user
//             }
//           } catch (error) {
//             // Handle any network or server-side errors
//             // Display appropriate error messages to the user
//           }
//         }
      
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text" id="name" value={name}  onChange={(e) => setName(e.target.value)}
//         />
//         {errors.name && <span>{errors.name}</span>}
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
//         />
//         {errors.email && <span>{errors.email}</span>}
//       </div>
//       <div>
//         <label htmlFor="contact_no">Contact Number</label>
//         <input
//           type="text"   id="contact_no" value={contact_no} onChange={(e) => setContact_no(e.target.value)}
//         />
//         {errors.contact_no && <span>{errors.contact_no}</span>}
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ContactForm;
