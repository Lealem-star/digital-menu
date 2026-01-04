const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/adminController');
const { getAllMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, getCategories } = require('../controllers/menuController');
const { authRequired } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authRequired, me);
router.get('/menu', authRequired, getAllMenuItems);
router.post('/menu', authRequired, addMenuItem);
router.put('/menu/:id', authRequired, updateMenuItem);
router.delete('/menu/:id', authRequired, deleteMenuItem);
router.get('/categories', authRequired, getCategories);

module.exports = router;

