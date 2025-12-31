import React, { useEffect, useRef, useState } from 'react';
import heroVideo from '../assets/endurance.mp4';
import MenuCard from '../components/MenuCard';
import MenuItemModal from '../components/MenuItemModal';
import FeedbackPage from '../components/FeedbackPage'; // Import FeedbackPage component

export default function HomePage() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    // Menu state and logic
    const [menuItems, setMenuItems] = useState([]);
    const [filter, setFilter] = useState('All'); // Re-introduce filter state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const menuSectionRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null); // State for the selected menu item

    const handleCardClick = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    // Ref for FeedbackPage component
    const feedbackSectionRef = useRef(null);
    // Ref for What's New & Upcoming section
    const whatsNewSectionRef = useRef(null);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        const tryPlay = () => {
            el.play().catch(() => {
                setTimeout(() => el.play().catch(() => { }), 300);
            });
        };
        tryPlay();
    }, []);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Fetch data from backend
                const response = await fetch('/api/menu');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const allCategories = ['All', 'popular collection', 'fast food', 'juice', 'lunch', 'Hot drinks', 'cold drinks', 'snack'];
    const categoriesToRender = ['popular collection', 'fast food', 'juice', 'lunch', 'Hot drinks', 'cold drinks', 'snack'];

    const getItemsForCategory = (category) => {
        if (category === 'popular collection') {
            return menuItems.filter(item => item.isPopular);
        }
        return menuItems.filter(item => item.category === category);
    };

    const handleExploreMenuClick = (e) => {
        e.preventDefault();
        menuSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    const handleWhatsNewClick = (e) => {
        e.preventDefault();
        whatsNewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <section className="hero">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    controls={false}
                    src={heroVideo}
                />
                <div className="hero-overlay">
                    <h1>Enqopa cafe and restaurant</h1>
                    <p>Eat Good, Do Good</p>
                    <a href="#menu-sections-container" onClick={handleExploreMenuClick} className="explore-menu-button">Explore Menu</a>
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <button
                        onClick={() => {
                            const el = videoRef.current;
                            if (!el) return;
                            try {
                                el.muted = !isMuted;
                                if (!el.muted) {
                                    el.volume = 1.0;
                                }
                                setIsMuted(el.muted);
                                el.play().catch(() => { });
                            } catch { }
                        }}
                        style={{
                            padding: '6px 10px',
                            borderRadius: 6,
                            border: '1px solid rgba(255,255,255,0.6)',
                            background: 'rgba(0,0,0,0.45)',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                </div>
            </section>

            {/* Menu Sections Container */}
            <div id="menu-sections-container" ref={menuSectionRef} className="menu-sections-container">
                <div className="menu-section-header"> {/* This div will hold the filter dropdown and an optional main title */}
                    <h2>Our Menu</h2>
                    <select className="filter-dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
                        {allCategories.map(cat => <option key={cat} value={cat}>{cat === 'popular collection' ? 'Popular Collection' : cat}</option>)}
                    </select>
                </div>

                {loading ? (
                    <div className="menu-loading">Loading menu items...</div>
                ) : error ? (
                    <div className="menu-error">Error: {error.message}</div>
                ) : (
                    categoriesToRender.map(category => {
                        const items = getItemsForCategory(category);
                        
                        // Render section only if filter is 'All' or matches the current category
                        if (filter !== 'All' && filter !== category) {
                            if (filter === 'popular collection' && category !== 'popular collection') return null;
                            if (filter === category && items.length === 0) return null; // Only hide if filter matches but no items
                            if (filter !== category && filter !== 'popular collection') return null; // Hide other categories when specific filter is active
                        }

                        if (items.length === 0) return null;

                        return (
                            <section key={category} className="menu-card-section">
                                <div className="category-header">
                                    <h2 className="category-title">{category === 'popular collection' ? 'Popular Collection' : category}</h2>
                                </div>
                                <div className="menu-cards-grid">
                                    {items.map(item => (
                                        <MenuCard key={item._id} item={item} onCardClick={handleCardClick} />
                                    ))}
                                </div>
                            </section>
                        );
                    })
                )}
            </div>

            {selectedItem && (
                <MenuItemModal item={selectedItem} onClose={handleCloseModal} />
            )}

            {/* Feedback Section (as a component) */}
            <div id="feedback-section" ref={feedbackSectionRef}>
                <FeedbackPage />
            </div>

            {/* What's New & Upcoming Section */}
            <section id="whats-new-section" ref={whatsNewSectionRef} className="section">
                <h2 style={{ marginBottom: 12 }}>What's New & Upcoming</h2>
                <div className="cards">
                    <article className="card">
                        <h3 style={{ marginTop: 0 }}>Seasonal Specials</h3>
                        <p>Fresh, locally sourced dishes available this month.</p>
                        <div style={{ display: 'inline-block', marginTop: 8 }}>View Menu</div>
                    </article>
                    <article className="card">
                        <h3 style={{ marginTop: 0 }}>Upcoming Events</h3>
                        <p>Live music every Friday and tasting nights.</p>
                        <a href="#whats-new-section" onClick={handleWhatsNewClick} style={{ display: 'inline-block', marginTop: 8 }}>What's New</a>
                    </article>
                </div>
            </section>
        </div>
    );
}