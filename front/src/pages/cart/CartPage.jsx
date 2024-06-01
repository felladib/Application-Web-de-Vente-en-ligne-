import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import OrderForm from '../cart/OrderForm.jsx';
import { useNavigate } from 'react-router-dom';
import './CartStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

    const CartPage = () => {
        const { authTokens } = useContext(AuthContext);
        const [cartItems, setCartItems] = useState([]);
        const mediaBaseURL = ' http://127.0.0.1:8000';
        const [showOrderForm, setShowOrderForm] = useState(false); // State to control the visibility of the order form
        const navigate = useNavigate()

        useEffect(() => {
            const fetchCartItems = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/cart/`, {
                        headers: {
                            'Authorization': `Bearer ${authTokens.access}`
                        }
                    });
                    if (response.status === 200) {
                        const data = await response.json();

                        // Fetch product details for each cart item
                        console.log('form data dans  cart page',data)
                        const promises = data.map(async item => {
                            const productResponse = await fetch(`http://127.0.0.1:8000/api/product/${item.product}`);
                            if (productResponse.status === 200) {
                                const productData = await productResponse.json();
                                return { ...item, product: productData }; // Merge product details into cart item
                            } else {
                                console.error('Failed to fetch product details for cart item:', item);
                                return null;
                            }
                        });
                        const resolvedItems = await Promise.all(promises);
                        setCartItems(resolvedItems.filter(item => item !== null));
                    } else {
                        console.error('Failed to fetch cart items.');
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            };
            fetchCartItems();
        }, [authTokens]);


        //Supprimer le produit du panier
        const handleDeleteCartItem = async (itemId) => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/delete-from-cart/${itemId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                });
                if (response.status === 204) {
                    // Remove the deleted item from the cartItems state
                    setCartItems(cartItems.filter(item => item.id !== itemId));
                } else {
                    console.error('Failed to delete cart item.');
                }
            } catch (error) {
                console.error('Error deleting cart item:', error);
            }
        };

        //Augmenter ou décrémenter la quantité du produit
        const handleModifyQuantity = async (itemId, newQuantity) => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cart/update-quantity-from-cart/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
                if (response.status === 200) {
                    // Update the quantity in the cartItems state
                    const updatedItems = cartItems.map(item => {
                        if (item.id === itemId) {
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    });
                    setCartItems(updatedItems);
                } else {
                    console.error('Failed to update quantity.');
                }
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        };



        const handleOrderSubmit = async (formData) => {
            try {
                console.log(formData)
                // Send request to backend API to create the order
                const response = await fetch('http://127.0.0.1:8000/api/create-order/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                    body: JSON.stringify({
                        userData: formData,
                        cartItems,
                    }),
                });

                if (response.ok) {
                    navigate('/order-details');
                } else {
                    console.error('Failed to create order:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating order:', error);
            }
        };

        

        return (
            <div id='main_cart'>
                <div>Mon Panier</div>
                <hr />
                {cartItems.length === 0 ? (
                    <p>Le panier est vide</p>
                ) : (
                    <div className='cart_body'>
                        <div className='cart_content' >
                        
                            {cartItems.map(item => (
                                <div key={item.id} id='item'>
                                    
                                        {/* Accessing product information */}
                                        <div className='img_container'>
                                            {console.log(` nous avons dans cart details ${item.product.image}`)}
                                            <img src={`${mediaBaseURL}${item.product.image}`} alt={item.product.name} /> 

                                        </div>
                                        <div className='disc_container'>
                                            <div className='disc_p'>
                                                <p>{item.product.name}</p>
                                                <p>{item.product.price}$</p>
                                            </div>
                                           
                                            
                                           <div className='qnt'>
                                                <button onClick={() => handleModifyQuantity(item.id, item.quantity + 1)}><FontAwesomeIcon icon={faPlus} /></button>
                                                <p>  {item.quantity}</p>
                                                <button onClick={() => handleModifyQuantity(item.id, Math.max(1, item.quantity - 1))}><FontAwesomeIcon icon={faMinus} /></button>
                                           </div>
                                          
                                            <p>{item.product.price * item.quantity}$</p>
                                            <button className='delete' onClick={() => handleDeleteCartItem(item.id)}><FontAwesomeIcon icon={faX} /></button>
                                            
                                        </div>
                                        {/* <hr/> */}
                                      
                                </div>
                                
                            ))}
                        
                        </div>
                        <div className='commande_total'>
                            <div>
                            <p>Total </p>
                            <p> {cartItems.reduce((total, item) => total + (item.quantity * item.product.price), 0)}$</p>
                            </div>
                            
                            <br/>
                            {!showOrderForm && (
                                <button onClick={() => setShowOrderForm(true)}>Commander</button>
                            )}
                        </div>
                        
                    </div>
                )}
                
                {showOrderForm && 
                    <div className="modal-background">
                        <div className="modal-content">
                            <OrderForm onSubmit={handleOrderSubmit} />
                        </div>
                    </div>
                }
                
                
            </div>
        );
    };

    export default CartPage;
