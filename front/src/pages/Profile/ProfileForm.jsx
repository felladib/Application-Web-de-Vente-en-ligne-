// ProfileForm.jsx
import React, { useState } from 'react';
import './ProfileStyle.css'
const ProfileForm = ({ profile, onUpdate }) => {
    const [formData, setFormData] = useState({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        // Clear the password field
        setFormData({ ...formData, password: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label>
                First Name:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
                New Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <button type="submit">Update</button>
        </form>

    );
};

export default ProfileForm;
