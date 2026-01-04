import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItems, updateMenuItem } from '../utils/api';

export default function EditFoodItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [calories, setCalories] = useState('');
    const [image, setImage] = useState('');
    const [isPopular, setIsPopular] = useState(false);
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [allergens, setAllergens] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMenuItem();
    }, [id]);

    const fetchMenuItem = async () => {
        try {
            setLoading(true);
            const items = await getMenuItems();
            const item = items.find(i => i._id === id);
            
            if (!item) {
                setError('Menu item not found');
                return;
            }

            setName(item.name || '');
            setDescription(item.description || '');
            setPrice(item.price?.toString() || '');
            setCalories(item.calories?.toString() || '');
            setImage(item.image || '');
            setIsPopular(item.isPopular || false);
            setCategory(item.category || '');
            setIngredients(item.ingredients?.join(', ') || '');
            setAllergens(item.allergens?.join(', ') || '');
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const updatedFoodItem = {
            name,
            description,
            price: parseFloat(price),
            calories: parseInt(calories) || 0,
            image,
            isPopular,
            category,
            ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item !== ''),
            allergens: allergens.split(',').map(item => item.trim()).filter(item => item !== ''),
        };

        try {
            await updateMenuItem(id, updatedFoodItem);
            alert('Food item updated successfully!');
            navigate('/admin/menu-items');
        } catch (err) {
            setError(err.message);
            alert(`Error updating food item: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading menu item...</div>;
    }

    return (
        <div className="add-food-item-container">
            <h2>Edit Food Item</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="add-food-item-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (ETB):</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="any" />
                </div>
                <div className="form-group">
                    <label htmlFor="calories">Calories (kcal):</label>
                    <input type="number" id="calories" value={calories} onChange={(e) => setCalories(e.target.value)} min="0" />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="isPopular" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
                    <label htmlFor="isPopular">Is Popular</label>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients (comma-separated):</label>
                    <input type="text" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="allergens">Allergens (comma-separated):</label>
                    <input type="text" id="allergens" value={allergens} onChange={(e) => setAllergens(e.target.value)} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button" disabled={submitting}>
                        {submitting ? 'Updating...' : 'Update Food Item'}
                    </button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/admin/menu-items')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

