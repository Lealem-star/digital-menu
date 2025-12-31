import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function MenuItemModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <img src={item.image} alt={item.name} className="modal-image" />
        <div className="modal-details">
          <h2 className="modal-title">{item.name}</h2>
          <p className="modal-description">{item.description}</p>
          <div className="modal-price-calories">
            <p className="modal-price">{item.price} ETB</p>
            {item.calories && <p className="modal-calories">{item.calories}Kcal</p>}
          </div>

          {item.ingredients && item.ingredients.length > 0 && (
            <div className="modal-section">
              <h3>Ingredients</h3>
              <div className="tag-list">
                {item.ingredients.map((ingredient, index) => (
                  <span key={index} className="tag">{ingredient}</span>
                ))}
              </div>
            </div>
          )}

          {item.allergens && item.allergens.length > 0 && (
            <div className="modal-section">
              <h3>Allergens</h3>
              <div className="tag-list">
                {item.allergens.map((allergen, index) => (
                  <span key={index} className="tag tag-allergen">{allergen}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

