import React, {useState, useEffect, useContext} from 'react'
// import AuthContext from '../context/AuthContext'
// import footer from

import './card.css'
import { useNavigate } from 'react-router-dom';



const Card = ({product}) => {
    const navigate = useNavigate();
     
    //envoyer un requete get:
    const handleClick = () => {
        // Redirige vers la page de détails du produit avec son ID
        navigate(`/product/${product.id}`);
    }


     // Configurez l'URL de base pour les fichiers media
     const mediaBaseURL = ' http://127.0.0.1:8000';

     // Construisez l'URL complète de l'image
     const imageUrl = `${mediaBaseURL}${product.image}`;
 
    return ( 
        <div className='card' onClick={handleClick} style={{ cursor: 'pointer' }}>
            {console.log(imageUrl)}
            <img src={imageUrl} alt="" />
            <p className='name'> {product.name}</p>
            <p className='price'>{product.price}$</p>
        </div>
     );
}
 
export default Card;