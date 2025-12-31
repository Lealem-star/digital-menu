import React, { useState } from 'react';

export default function AddFoodItemPage() {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const newFoodItem = {
      id: Date.now(), // Generate a unique ID for demonstration
      name,
      description,
      price: parseFloat(price),
      calories: parseInt(calories),
      image,
      isPopular,
      category,
      ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item !== ''),
      allergens: allergens.split(',').map(item => item.trim()).filter(item => item !== ''),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newFoodItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add food item');
      }

      alert('Food item added successfully!');
      // Navigate to the menu page to trigger a refresh

      // Clear form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setCalories('');
      setImage('');
      setIsPopular(false);
      setCategory('');
      setIngredients('');
      setAllergens('');

    } catch (err) {
      setError(err.message);
      alert(`Error adding food item: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-food-item-container">
      <h2>Add New Food Item</h2>
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
          <input type="number" id="calories" value={calories} onChange={(e) => setCalories(e.target.value)} required min="0" />
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
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Food Item'}
        </button>
      </form>
    </div>
  );
}