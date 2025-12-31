import React, { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';

export default function FeedbackPage() {
    const [feedback, setFeedback] = useState('');
    const maxLength = 500;

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setFeedback(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your feedback!');
        console.log('Feedback submitted:', feedback);
        setFeedback('');
    };

    return (
        <div className="feedback-page-container">
            <div className="feedback-card">
                <FaRegCommentDots className="feedback-icon" />
                <h2>Share Your Suggestions</h2>
                <p>
                    We value your opinion! Please let us know your thoughts, suggestions,
                    or any issues you've encountered with our digital menu.
                </p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Type your feedback here..."
                        value={feedback}
                        onChange={handleChange}
                        rows="6"
                    ></textarea>
                    <div className="char-count">
                        <span>{feedback.length} / {maxLength} characters</span>
                    </div>
                    <button type="submit" className="submit-button">
                        Submit Suggestion
                    </button>
                </form>
            </div>
        </div>
    );
}

