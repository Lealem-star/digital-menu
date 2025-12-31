import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Enqopa Cafe and Restaurant</h2>
        <p>Follow us for the latest updates and mouth-watering content!</p>
        <div className="social-links">
          <a href="https://www.instagram.com/yourinstagram" target="_blank" rel="noopener noreferrer" className="social-button">Instagram</a>
          <a href="https://www.facebook.com/yourfacebook" target="_blank" rel="noopener noreferrer" className="social-button">Facebook</a>
          <a href="https://www.tiktok.com/@yourtiktok" target="_blank" rel="noopener noreferrer" className="social-button">Tiktok</a>
        </div>
        <p className="copyright">© 2025 Enqopa cafe and restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}
