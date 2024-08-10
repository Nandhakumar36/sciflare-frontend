import React, { useState, useEffect } from 'react';
// import './Profile.css';
import { persist } from './services/local-storage/index';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const userObj = localStorage.getItem('user');
    const userData = JSON.parse(userObj);
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5005/api/v1/user_actions/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data?.data);
            })
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    return (
        <div className="home-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>SciFlare</h2>
                </div>
                <ul className="sidebar-menu">
                {userData.userType === 'Admin' ? <li>
                        <Link to="/home" className="sidebar-item">Users</Link>
                    </li> : null
                    }
                    <li>
                        <a href="/profile" className="sidebar-item active">Profile</a>
                    </li>
                </ul>
            </aside>
            <main className="content">
                <div className="profile-card">
                    <div className="profile-image">
                        {/* <img src={user?.profileImage || ''} alt="Profile" /> */}
                    </div>
                    <div className="profile-info">
                        <h1>Name : {user?.firstName || ''}</h1>
                        <h2>Email : {user?.email || ''}</h2>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
