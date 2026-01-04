import React, { useEffect, useState } from 'react';
import { getMenuItems, deleteMenuItem, getCategories } from '../utils/api';
import AddFoodItemModal from './AddFoodItemModal';
import CategoriesModal from './CategoriesModal';
import EditFoodItemModal from './EditFoodItemModal';

export default function MenuSettingsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [items, cats] = await Promise.all([
                getMenuItems(),
                getCategories()
            ]);
            setMenuItems(items);
            setCategories(cats);
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
            fetchData(); // Refresh stats
        } catch (err) {
            alert(`Error deleting item: ${err.message}`);
        }
    };

    const handleAddSuccess = () => {
        setShowAddModal(false);
        fetchData();
    };

    const handleEditSuccess = () => {
        setEditingItem(null);
        fetchData();
    };

    const categoryOptions = ['All', ...new Set(menuItems.map(item => item.category))];
    const filteredItems = filter === 'All' 
        ? menuItems 
        : menuItems.filter(item => item.category === filter);

    const stats = {
        totalItems: menuItems.length,
        totalCategories: categories.length,
        popularItems: menuItems.filter(item => item.isPopular).length
    };

    if (loading) {
        return <div className="admin-loading">Loading menu settings...</div>;
    }

    return (
        <div className="menu-settings-page">
            {/* Dashboard Stats at Top */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>{stats.totalItems}</h3>
                    <p>Total Menu Items</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.totalCategories}</h3>
                    <p>Categories</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.popularItems}</h3>
                    <p>Popular Items</p>
                </div>
            </div>

            {/* Action Buttons at Top Right */}
            <div className="menu-settings-header">
                <h2>Menu Items Management</h2>
                <div className="header-actions">
                    <button 
                        onClick={() => setShowCategoriesModal(true)}
                        className="btn-categories"
                    >
                        Categories
                    </button>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="btn-primary"
                    >
                        + Add Food Item
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Filter Section */}
            <div className="filter-section">
                <label htmlFor="category-filter">Filter by Category: </label>
                <select 
                    id="category-filter" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="category-select"
                >
                    {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Menu Items Table */}
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
                                            <button 
                                                onClick={() => setEditingItem(item)}
                                                className="btn-edit"
                                            >
                                                Edit
                                            </button>
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

            {/* Modals */}
            {showAddModal && (
                <AddFoodItemModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={handleAddSuccess}
                />
            )}

            {showCategoriesModal && (
                <CategoriesModal
                    onClose={() => setShowCategoriesModal(false)}
                    onUpdate={fetchData}
                />
            )}

            {editingItem && (
                <EditFoodItemModal
                    item={editingItem}
                    onClose={() => setEditingItem(null)}
                    onSuccess={handleEditSuccess}
                />
            )}
        </div>
    );
}

