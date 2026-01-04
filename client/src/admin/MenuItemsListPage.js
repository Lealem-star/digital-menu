import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMenuItems, deleteMenuItem } from '../utils/api';

export default function MenuItemsListPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const items = await getMenuItems();
            setMenuItems(items);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        try {
            await deleteMenuItem(id);
            setMenuItems(menuItems.filter(item => item._id !== id));
        } catch (err) {
            alert(`Error deleting item: ${err.message}`);
        }
    };

    const categories = ['All', ...new Set(menuItems.map(item => item.category))];

    const filteredItems = filter === 'All' 
        ? menuItems 
        : menuItems.filter(item => item.category === filter);

    if (loading) {
        return <div className="admin-loading">Loading menu items...</div>;
    }

    return (
        <div className="menu-items-list-container">
            <div className="menu-items-header">
                <h2>Menu Items Management</h2>
                <Link to="/admin/add-food-item" className="btn-primary">
                    Add New Item
                </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="filter-section">
                <label htmlFor="category-filter">Filter by Category: </label>
                <select 
                    id="category-filter" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="category-select"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="menu-items-table-container">
                {filteredItems.length === 0 ? (
                    <p className="no-items">No menu items found.</p>
                ) : (
                    <table className="menu-items-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price (ETB)</th>
                                <th>Calories</th>
                                <th>Popular</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        {item.image ? (
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="menu-item-thumbnail"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/50';
                                                }}
                                            />
                                        ) : (
                                            <div className="menu-item-thumbnail-placeholder">No Image</div>
                                        )}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price?.toFixed(2)}</td>
                                    <td>{item.calories || 'N/A'}</td>
                                    <td>{item.isPopular ? '✓' : '✗'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link 
                                                to={`/admin/edit-food-item/${item._id}`}
                                                className="btn-edit"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(item._id, item.name)}
                                                className="btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

