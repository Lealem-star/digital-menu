import React, { useState, useEffect } from 'react';
import { updateMenuItem } from '../utils/api';

export default function EditFoodItemModal({ item, onClose, onSuccess }) {
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
    const [error, setError] = useState(null);

    useEffect(() => {
        if (item) {
            setName(item.name || '');
            setDescription(item.description || '');
            setPrice(item.price?.toString() || '');
            setCalories(item.calories?.toString() || '');
            setImage(item.image || '');
            setIsPopular(item.isPopular || false);
            setCategory(item.category || '');
            setIngredients(item.ingredients?.join(', ') || '');
            setAllergens(item.allergens?.join(', ') || '');
        }
    }, [item]);

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
            await updateMenuItem(item._id, updatedFoodItem);
            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Food Item</h2>
                    <button className="modal-close-button" onClick={onClose}>×</button>
                </div>
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
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

