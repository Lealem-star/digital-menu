const router = require('express').Router();
const { getAllMenuItems } = require('../controllers/menuController');

router.get('/', getAllMenuItems);

module.exports = router;

