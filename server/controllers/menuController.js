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

async function updateMenuItem(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, category, image, isPopular, calories, ingredients, allergens } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: 'Name, description, price, and category are required' });
        }

        const updatedMenuItem = await Menu.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                category,
                image,
                isPopular,
                calories,
                ingredients,
                allergens
            },
            { new: true, runValidators: true }
        );

        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        return res.json(updatedMenuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function deleteMenuItem(req, res) {
    try {
        const { id } = req.params;

        const deletedMenuItem = await Menu.findByIdAndDelete(id);

        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        return res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function getCategories(req, res) {
    try {
        const categories = await Menu.distinct('category');
        return res.json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getAllMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, getCategories };

