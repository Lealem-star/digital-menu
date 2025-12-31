import React from 'react';

export default function MenuCard({ item, onCardClick }) {
  return (
    <div className="menu-card" onClick={() => onCardClick(item)}>
      {item.isPopular && <span className="popular-tag">⭐ Popular</span>}
      <img src={item.image} alt={item.name} className="menu-card-image" />
      <div className="menu-card-content">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-description">{item.description}</p>
        <div className="menu-card-details">
          <span className="menu-card-price">{item.price} ETB</span>
          {item.calories && <span className="menu-card-calories">{item.calories} kcal</span>}
        </div>
      </div>
    </div>
  );
}
