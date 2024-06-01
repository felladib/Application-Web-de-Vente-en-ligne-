import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './SignupStyle.css'

const SignUpPage = () => {
        const { signupUser } = useContext(AuthContext);
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            signupUser(formData);
        };

    return (
        <div id='SignUpPage'>
        <div id='SignUp'>
            
            <div className='logo'>
                <p>Noelle</p>
            </div>
            <div>
                

            <form onSubmit={handleSubmit}>
                <div className='names'>
                    <input type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                </div>
                    <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                    <input type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
                    <input type="submit" />
            </form>

            </div>

        </div>
        </div>
    );
};

export default SignUpPage;
