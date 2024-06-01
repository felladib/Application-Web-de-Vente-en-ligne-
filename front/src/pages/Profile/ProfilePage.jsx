// ProfilePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import ProfileForm from './ProfileForm';

import {rougeALevres, yeux , levres , visage ,profil} from './../../assets'
import './ProfileStyle.css'
const ProfilePage = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });
            const data = await response.json();
            if (response.ok) {
                setProfile(data);
            } else if (response.statusText === 'Unauthorized') {
                logoutUser();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleUpdateProfile = async (formData) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/profile/update-profile/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Refresh profile data
                getProfile();
                setUpdateMessage('Your information has been updated.');
            } else {
                console.error('Failed to update profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="profile-container">
            {profile != null ? (
                <div className='img_info' >
                    <div className='img_name'>
                        <img src={profil} alt="" />
                        <h2>{profile.first_name} {profile.last_name}</h2>
                    </div>
                    <div>
                          <ProfileForm profile={profile} onUpdate={handleUpdateProfile} />
                            {updateMessage && <p>{updateMessage}</p>}
                    </div>
                    
                  
                </div>
            ) : (
                <p>No profile data available</p>
            )}
        </div>

    );
};

export default ProfilePage;
