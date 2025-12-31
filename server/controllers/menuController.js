const Menu = require('../models/Menu');

async function getAllMenuItems(req, res) {
    try {
        const menuItems = await Menu.find();
        return res.json(menuItems);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function addMenuItem(req, res) {
    try {
        const { name, description, price, category, image, isPopular, calories, ingredients, allergens } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: 'Name, description, price, and category are required' });
        }

        const newMenuItem = await Menu.create({
            name,
            description,
            price,
            category,
            image,
            isPopular,
            calories,
            ingredients,
            allergens
        });

        return res.status(201).json(newMenuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getAllMenuItems, addMenuItem };

