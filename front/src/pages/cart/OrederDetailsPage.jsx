import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './orderDetails.css'
const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const mediaBaseURL = ' http://127.0.0.1:8000/media/';

    useEffect(() => {
    const fetchOrderDetails = async () => {
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/order-details/`,{
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setOrder(data);
            console.log( 'form data dans la page de order details ',data);
            console.log('items' ,data.items)
            // recuperer les infromation des données 
        } else {
            console.error('Failed to fetch order details:', response.statusText);
        }
        } catch (error) {
        console.error('Error fetching order details:', error);
        }
    };

    fetchOrderDetails();
    }, [orderId]);

  return (
    <div>
      {order ? (
        <div className='main_order_details'>
          <div className='head_order'>
              <h2>Order Details
              </h2>
            

          </div>
          <div className='body_order'> 
        
          <div className='order_details'>
            <h3>Order Details</h3>
            
            <div className='div_user_details'>
                <p> Order ID : </p>
                <p>{order.id}</p>
            </div>
            <div className='div_user_details'>
                <p>Status :      </p>
                <p>  {order.status}</p>
            </div>
            <div className='div_user_details'>
              <p>Name :         </p>
              <p> {order.name}</p>
            </div>
            <div className='div_user_details'>
                <p>Address  :   </p>
                <p>   {order.address}</p>
            </div>
           
            
           <div className='div_user_details'>
            <p>Phone Number  : </p>
            <p>{order.phone_number}</p>
           </div>
          
            
            <div className='total_div'>
               <p>Total Amount</p>
               <p> <span>{order.total_amount}$</span></p>
            </div>
          </div>
         

          
          <div className='order_item_details'>

         
             <h3>Order Items</h3>

            {order.items.map(item => (
              <div key={item.id} id='order_item'>
                {console.log(item.product)}
                 <div className='img_container'>
                    { console.log(`nous avons dans order details ${mediaBaseURL}${item.image}`)}
                    <img src={`${mediaBaseURL}${item.image}`} alt={item.product_name} />   

                  </div>
                  <div className='order_item_details'>
                 
                    <p>{item.name}</p>
                    <p className='p_order_item_details'>{item.price}$</p>
                    <p className='p_order_item_details'>Quantity {item.quantity}</p>
                    <p className='p_order_item_details_total '> Total  {item.subtotal}$</p>

                  </div>
                
              </div>
            ))}
           </div>
        </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
