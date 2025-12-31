const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true, trim: true },
        image: { type: String, default: '' },
        isPopular: { type: Boolean, default: false },
        ingredients: { type: [String], default: [] },
        allergens: { type: [String], default: [] }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);

