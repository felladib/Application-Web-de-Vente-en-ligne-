import React, { useState } from 'react';
import './orderFormStyle.css'
const OrderForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} id='form'>
            <h2>Order Form</h2>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;
