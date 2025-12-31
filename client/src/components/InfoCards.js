import React from 'react';

export default function InfoCards() {
  return (
    <section className="info-cards-container">
      <div className="info-card">
        <div className="info-icon">📍</div>
        <h3>Location</h3>
        <p>Jemo1, Addis Ababa</p>
      </div>
      <div className="info-card">
        <div className="info-icon">🕒</div>
        <h3>Hours</h3>
        <p>Mon-Sun: 8:00 AM - 9:00 PM</p>
      </div>
      <div className="info-card">
        <div className="info-icon">📞</div>
        <h3>Order</h3>
        <p>(+251) 950 500 101</p>
        <p>(+251) 950 500 303</p>
      </div>
    </section>
  );
}
