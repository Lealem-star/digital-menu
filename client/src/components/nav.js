import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const homePagePath = '/';
    if (window.location.pathname === homePagePath) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = homePagePath + `#${sectionId}`;
    }
    setIsOpen(false); // Close menu after clicking a link
  };

  return (
    <nav className="header">
      <div className="header-left">
        <Link to="/">
          <img src="/menu.png" alt="Logo" style={{ height: 28, display: 'block' }} />
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`header-right ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={(e) => handleScrollToSection(e, 'hero')}>Home</Link>
        <a href="#whats-new-section" onClick={(e) => handleScrollToSection(e, 'whats-new-section')}>What's New</a>
        <a href="#feedback-section" onClick={(e) => handleScrollToSection(e, 'feedback-section')}>Feedback</a>
      </div>
    </nav>
  );
}
