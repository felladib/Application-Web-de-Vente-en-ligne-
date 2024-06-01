import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSnapchat, faWhatsapp, faFacebook,faYoutube ,faTwitter} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';



const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'black', color: 'white', padding: '20px 0' , height:'70vh'}}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap' , paddingTop:'100px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Boutique</h4>
                    <ul style={{ listStyle: 'none', padding: 0 , lineHeight:'1.5rem' }}>
                        <li>Boutique</li>
                        <li>Lèvres</li>
                        <li>Yeux</li>
                        <li>Visage</li>
                    </ul>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Notre boutique</h4>
                    <p style={{ lineHeight:'1.5rem'}} >27 Rue Mohamed Belouizdad</p>
                    <p style={{ lineHeight:'1.5rem'}}>16000 Alger, Algérie</p>
                    <p style={{ lineHeight:'1.5rem'}}>Dimanche-Jeudi : 9 h - 19 h</p>
                    <p style={{ lineHeight:'1.5rem'}}>Vendredi : 9 h - 13 h</p>
                    <p style={{ lineHeight:'1.5rem'}}>Tél : +213 21 23 45 67</p>
                    <p style={{ lineHeight:'1.5rem'}}>E-mail : noelle_12@gmail.com</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Politique</h4>
                    <ul style={{ listStyle: 'none', padding: 0 , lineHeight:'1.5rem' }}>
                        <li>Expédition et retours</li>
                        <li>Politique de boutique</li>
                        <li>Moyens de paiement</li>
                        <li>Politique de cookies</li>
                        <li>Mentions légales</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Service client</h4>
                    <p style={{ lineHeight:'1.5rem'}}>Tél : +213 21 23 45 67</p>
                    <p style={{ lineHeight:'1.5rem'}}>E-mail : noelle_12@gmail.com</p>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} style={{ marginRight: '10px', color: 'white' }} /></a>
                        <a href="#"><FontAwesomeIcon icon={faFacebook} style={{ marginRight: '10px', color: 'white' }} /></a>
                        <a href="#"><FontAwesomeIcon icon={faYoutube} style={{ marginRight: '10px', color: 'white' }} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} style={{ marginRight: '10px', color: 'white' }} /></a>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '150px' }}>
                <p>© 2035 par Noelle.</p>
            </div>
        </footer>
    );
}

export default Footer;
