import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSnapchat, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


const search = () => {
    return ( 
        <div className="search-bar">
            <div className="search-container">
                {/* <input type="text" placeholder="Rechercher..." />
                <button className="search-button">Search</button> */}
            </div>
            <div className="social-icons" style={{ color: 'white' }}>
                    
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faSnapchat} />
                <FontAwesomeIcon icon={faWhatsapp} />
                <FontAwesomeIcon icon={faFacebook} />
            
            </div>
        </div>
     );
}
 
export default search;