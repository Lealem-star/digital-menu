import React, { useEffect, useState } from 'react';
import { getMenuItems, getCategories } from '../utils/api';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [cats, items] = await Promise.all([
                getCategories(),
                getMenuItems()
            ]);
            setCategories(cats);
            setMenuItems(items);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = () => {
        if (!newCategory.trim()) {
            alert('Please enter a category name');
            return;
        }
        if (categories.includes(newCategory.trim())) {
            alert('Category already exists');
            return;
        }
        alert('To add a new category, create a menu item with that category. Categories are automatically created when you add menu items.');
        setNewCategory('');
    };

    const handleStartEdit = (category) => {
        setEditingCategory(category);
        setEditValue(category);
    };

    const handleSaveEdit = async () => {
        if (!editValue.trim()) {
            alert('Category name cannot be empty');
            return;
        }
        if (editValue.trim() === editingCategory) {
            setEditingCategory(null);
            return;
        }

        // Update all menu items with the old category to the new category
        const itemsToUpdate = menuItems.filter(item => item.category === editingCategory);
        
        if (itemsToUpdate.length === 0) {
            alert('No items found with this category');
            setEditingCategory(null);
            return;
        }

        if (!window.confirm(`This will update ${itemsToUpdate.length} menu item(s) from "${editingCategory}" to "${editValue.trim()}". Continue?`)) {
            setEditingCategory(null);
            return;
        }

        try {
            // Note: This would require a bulk update endpoint. For now, we'll show a message.
            alert('Bulk category update feature requires backend support. Please update menu items individually or contact the developer.');
            setEditingCategory(null);
            fetchData(); // Refresh data
        } catch (err) {
            alert(`Error updating category: ${err.message}`);
        }
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
        setEditValue('');
    };

    const getCategoryItemCount = (category) => {
        return menuItems.filter(item => item.category === category).length;
    };

    if (loading) {
        return <div className="admin-loading">Loading categories...</div>;
    }

    return (
        <div className="categories-container">
            <h2>Category Management</h2>
            
            {error && <div className="error-message">{error}</div>}

            <div className="category-info">
                <p>Categories are automatically created when you add menu items. You can view and manage them here.</p>
            </div>

            <div className="add-category-section">
                <h3>Add New Category</h3>
                <p className="info-text">To add a new category, create a menu item with that category name.</p>
                <div className="add-category-form">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Category name"
                        className="category-input"
                    />
                    <button onClick={handleAddCategory} className="btn-primary">
                        Info
                    </button>
                </div>
            </div>

            <div className="categories-list-section">
                <h3>Existing Categories ({categories.length})</h3>
                {categories.length === 0 ? (
                    <p className="no-categories">No categories found. Add menu items to create categories.</p>
                ) : (
                    <div className="categories-grid">
                        {categories.map(category => (
                            <div key={category} className="category-card">
                                {editingCategory === category ? (
                                    <div className="category-edit-form">
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            className="category-edit-input"
                                            autoFocus
                                        />
                                        <div className="category-edit-actions">
                                            <button onClick={handleSaveEdit} className="btn-save">Save</button>
                                            <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="category-header">
                                            <h4>{category}</h4>
                                            <span className="category-count">{getCategoryItemCount(category)} item(s)</span>
                                        </div>
                                        <div className="category-actions">
                                            <button 
                                                onClick={() => handleStartEdit(category)}
                                                className="btn-edit"
                                            >
                                                Rename
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="category-note">
                <p><strong>Note:</strong> To rename a category, all menu items with that category will need to be updated. 
                Currently, you can rename categories by editing individual menu items.</p>
            </div>
        </div>
    );
}

