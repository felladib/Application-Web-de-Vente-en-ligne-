import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './HeaderStyle.css'

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className='header'>
            <div className='header-logo'>
                <p>Noelle</p>
            </div>

            <div className='header-links'>
                <Link to="/">Home</Link>
                <Link to="/boutique">Boutique</Link>
                <Link to="/Visage">Visage</Link>
                <Link to="/levre">Lèvres</Link>
                <Link to="/yeux">Yeux</Link>
            </div>

            <div className='header-login-cart'>
                {user ? (
                    <div className='profil'>
                        <div className="dropdown">
                            <button className="dropbtn" onClick={handleDropdownToggle}>
                                Profile
                            </button>
                            {showDropdown && (
                                <div className="dropdown-content">
                                    <Link to="/profile"><button onClick={handleDropdownToggle}>Voir Profile</button></Link>
                                    <button onClick={logoutUser}>Logout</button>
                                </div>
                            )}
                            <div className='header_cart'>
                                    <Link to="/cart">Cart</Link>
                            </div>
                            
                        </div>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
               
            </div>
            {/* <div className='header_cart'>
                    <Link to="/cart">Cart</Link>
                </div> */}
        </div>
    )
}

export default Header
