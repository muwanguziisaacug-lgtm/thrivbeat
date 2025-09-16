'use client'
import { useState } from "react";
import { ContactPage } from "../_components/ContactComponent";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
      <ContactPage
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={ formData }
      />
  );
};

export default Contact;