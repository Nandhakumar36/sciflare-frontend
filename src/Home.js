import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import './Home.css';
import { createUSer, updateUser, deleteUser } from './services/auth/index';

const Home = () => {
    const [users, setUsers] = useState([]);
    const userObj = localStorage.getItem('user');
    const userData = JSON.parse(userObj);
    console.log('userObj', JSON.parse(userObj))
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [callApi, setCallapi] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5005/api/v1/users/user_list')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data?.users);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [isModalOpen, callApi]);

    const handleAddUser = async (values, { setSubmitting }) => {
        const res = editingUser
            ? await updateUser(editingUser._id, values)
            : await createUSer(values);

        if (res.data.success) {
            setModalOpen(false);
            setEditingUser(null);
        } else {
            alert(res.data.message);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleDeleteUser = async (userId) => {
        const res = await deleteUser(userId);
        if (res.data.success) {
            setCallapi(!callApi)
            setUsers(users.filter(user => user.id !== userId));
        } else {
            alert(res.data.message);
        }
    };

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
                        <Link to="/profile" className="sidebar-item">Profile</Link>
                    </li>
                </ul>
            </aside>
            <main className="content">
                <div className='toppart'>
                    <h1>Users List</h1>
                    <button
                        type='button'
                        className='button'
                        onClick={() => setModalOpen(true)}
                    >
                        Add User
                    </button>
                </div>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td className='actions'>
                                    <button
                                        className="button edit-button"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="button delete-button"
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                        <Formik
                            initialValues={{
                                firstName: editingUser?.firstName || '',
                                email: editingUser?.email || '',
                                password: '',
                            }}
                            onSubmit={handleAddUser}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            onChange={handleChange}
                                            value={values.firstName}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            required
                                        />
                                    </div>
                                    {!editingUser && (
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className="modal-actions">
                                        <button
                                            type="submit"
                                            className="button"
                                            disabled={isSubmitting}
                                        >
                                            {editingUser ? 'Update' : 'Submit'}
                                        </button>
                                        <button
                                            type="button"
                                            className="button cancel-button"
                                            onClick={() => {
                                                setModalOpen(false);
                                                setEditingUser(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
