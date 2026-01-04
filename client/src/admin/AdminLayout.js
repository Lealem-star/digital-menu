import React, { useEffect, useState } from 'react';
import { Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import { getMe } from '../utils/api';

export default function AdminLayout() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        getMe()
            .then((data) => {
                setAdmin(data.admin);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (loading) {
        return <div className="admin-loading">Loading admin data...</div>;
    }

    if (error) {
        // Redirect to login page if authentication fails
        return <Navigate to="/login" replace />;
    }

    const isMenuSettingsActive = location.pathname === '/admin' || location.pathname === '/admin/menu-settings';

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h3>Admin Dashboard</h3>
                    <p>Signed in as: {admin.email}</p>
                </div>
                <nav className="admin-nav">
                    <ul>
                        <li>
                            <Link 
                                to="/admin/menu-settings" 
                                className={isMenuSettingsActive ? 'active' : ''}
                            >
                                Menu-Settings
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="admin-content">
                <Outlet /> {/* This is where child routes will render */}
            </main>
        </div>
    );
}
