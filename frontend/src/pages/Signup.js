import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    // State to capture signup details, including role
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        role: '' // Initial role value is empty to prompt user selection
    });

    const navigate = useNavigate();

    // Handles form field changes by updating state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handles signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = signupInfo;

        // Validate all required fields, including role
        if (!name || !email || !password || !role) {
            return handleError('Name, email, password, and role are required');
        }

        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo) // Send signup info, including selected role
            });
            const result = await response.json();

            // Check response for success or error messages
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message); // Display success message
                setTimeout(() => {
                    navigate('/login'); // Redirect to login
                }, 1000);
            } else if (error) {
                handleError(error?.details[0]?.message || 'An error occurred'); // Display error details
            } else {
                handleError(message); // Handle general failure message
            }
        } catch (err) {
            handleError('An unexpected error occurred');
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                {/* Name input */}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>

                {/* Email input */}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>

                {/* Password input */}
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>

                {/* Role selection dropdown */}
                <div>
                    <label htmlFor='role'>Role</label>
                    <select name='role' onChange={handleChange} value={signupInfo.role}>
                        <option value=''>Select Role</option>
                        <option value='patient'>Patient</option>
                        <option value='doctor'>Doctor</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>

                {/* Submit button */}
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
