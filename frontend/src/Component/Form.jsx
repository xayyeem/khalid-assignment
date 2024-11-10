import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [imageError, setImageError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'phone') setPhone(value);
    };

   
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

  
    const validateForm = () => {
        let valid = true;

       
        if (!name.trim()) {
            setNameError('Name is required');
            valid = false;
        } else {
            setNameError('');
        }

       
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email.trim()) {
            setEmailError('Email is required');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone.trim()) {
            setPhoneError('Phone number is required');
            valid = false;
        } else if (!phoneRegex.test(phone)) {
            setPhoneError('Please enter a valid 10-digit phone number');
            valid = false;
        } else {
            setPhoneError('');
        }

       
        if (!image) {
            setImageError('Image is required');
            valid = false;
        } else {
            setImageError('');
        }

        return valid;
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const isValid = validateForm();
        if (!isValid) return;

        
        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('phone', phone);
        form.append('image', image);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>

                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        required
                    />
                    {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
                </div>

                <div>
                    <label>Upload Photo</label>
                    <input type="file" onChange={handleFileChange} required />
                    {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
