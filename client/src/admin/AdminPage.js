import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMenuItems, getCategories } from '../utils/api';

export default function AdminPage() {
    const [stats, setStats] = useState({
        totalItems: 0,
        totalCategories: 0,
        popularItems: 0,
        loading: true
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [items, categories] = await Promise.all([
                getMenuItems(),
                getCategories()
            ]);
            setStats({
                totalItems: items.length,
                totalCategories: categories.length,
                popularItems: items.filter(item => item.isPopular).length,
                loading: false
            });
        } catch (err) {
            console.error('Error fetching stats:', err);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Use the sidebar to manage your restaurant's data.</p>
            
            {!stats.loading && (
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>{stats.totalItems}</h3>
                        <p>Total Menu Items</p>
                        <Link to="/admin/menu-items" className="stat-link">View All →</Link>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.totalCategories}</h3>
                        <p>Categories</p>
                        <Link to="/admin/categories" className="stat-link">Manage →</Link>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.popularItems}</h3>
                        <p>Popular Items</p>
                        <Link to="/admin/menu-items" className="stat-link">View All →</Link>
                    </div>
                </div>
            )}

            <div className="dashboard-actions">
                <Link to="/admin/add-food-item" className="dashboard-action-btn">
                    + Add New Food Item
                </Link>
                <Link to="/admin/menu-items" className="dashboard-action-btn">
                    View All Menu Items
                </Link>
            </div>
        </div>
    );
}