import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.css';
import AuthContext from '../../context/AuthContext';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';


const ProductPage = () => {
    const { authTokens } = useContext(AuthContext);
    const { id } = useParams();
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const [product, setProduct] = useState(null);
    const [showCartConfirmation, setShowCartConfirmation] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchProd = () => {
            fetch(`http://127.0.0.1:8000/api/product/${id}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setProduct(data);
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                });
        };
        fetchProd();
    }, [id]);

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                const promises = data.map(async (item) => {
                    const productResponse = await fetch(`http://127.0.0.1:8000/api/product/${item.product}`);
                    if (productResponse.status === 200) {
                        const productData = await productResponse.json();
                        return { ...item, product: productData };
                    } else {
                        console.error('Failed to fetch product details for cart item:', item);
                        return null;
                    }
                });
                const resolvedItems = await Promise.all(promises);
                setCartItems(resolvedItems.filter((item) => item !== null));
            } else {
                console.error('Failed to fetch cart items.');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        if (showCartConfirmation && authTokens) {
            fetchCartItems();
        }
    }, [showCartConfirmation]);
    

    const handleAddToCart = async () => {
        if (!authTokens) {
            window.location.href = '/login';
            return;
        }
        try {
            const cartResponse = await fetch(`http://127.0.0.1:8000/api/cart`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            if (cartResponse.status === 200) {
                const cartData = await cartResponse.json();
                const existingCartItem = cartData.find((item) => item.product === parseInt(id));
                if (existingCartItem) {
                    const updatedQuantity = existingCartItem.quantity + quantity;
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/update-cartProduct-quantity/${existingCartItem.id}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authTokens.access}`,
                            },
                            body: JSON.stringify({ quantity: updatedQuantity }),
                        }
                    );
                    if (response.status === 200) {
                        setShowCartConfirmation(true);
                    } else {
                        alert('Failed to update product quantity in cart.');
                    }
                } else {
                    const response = await fetch(`http://127.0.0.1:8000/api/add-to-cart/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authTokens.access}`,
                        },
                        body: JSON.stringify({ product_id: id, quantity: quantity }),
                    });
                    if (response.status === 201) {
                        setShowCartConfirmation(true);
                    } else {
                        alert('Failed to add product to cart.');
                    }
                }
            } else {
                console.error('Failed to fetch cart items.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleCloseCartConfirmation = () => {
        setCartItems([]);
        setShowCartConfirmation(false);
    };

    const calculateTotal = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            const itemPrice = item.product.price * item.quantity;
            totalPrice += itemPrice;
        });
        setTotal(totalPrice);
    };

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);


    return (
        <div className='main'>
            {product ? (
                <div>

                    <div className='product'>
                        <div className='prod_image'>
                            <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
                        </div>

                        <div className='prod_details'>
                            <p className='title'>{product.name}</p>
                            <p className='price'> {product.price}$</p>
                            <div class="input-container">
                                <label for="quantity">Quantity</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                            <button onClick={handleAddToCart}>Ajouter au panier</button>

                            <div className='disc'>
                                <p>INFOS D'ARTICLE</p>
                                <p>{product.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div>Chargement...</div>
            )}
            {showCartConfirmation && (
                <div className="cart-overlay">
                    <div className="cart-confirmation">
                        <div className="cart-content">

                            <div className='panier_header'>
                            <button onClick={handleCloseCartConfirmation}><FontAwesomeIcon icon={faGreaterThan} /></button>
                                <p>Panier</p>
                            </div>
                            
                            <ul>
                                {cartItems.map((item) => (
                                    <li key={item.id}>
                                        <div className='item'>
                                            <div className='img_cart'>
                                            <img src={`http://127.0.0.1:8000${item.product.image}`} alt={product.name} /> 
                                            </div>
                                            <div className='prod_cart'>
                                                <p>{item.product.name} </p>
                                                <p>{item.product.price}$</p>
                                                <p>Quantity: {item.quantity} </p>

                                            </div>
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                    
                            <div className='div_panier'>
                                <div id='total'>
                                     <p>Sous-Total </p>
                                    <p>{total}$</p>
                                </div>
                               <div id='div_voir_panier'>
                                 <Link to='/cart'><button className='voir_panier'>Voir le panier</button> </Link>
                               </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductPage;
