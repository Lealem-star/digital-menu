const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/adminController');
const { getAllMenuItems, addMenuItem } = require('../controllers/menuController');
const { authRequired } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authRequired, me);
router.post('/menu', authRequired, addMenuItem);

module.exports = router;

