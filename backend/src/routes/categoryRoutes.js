const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategory, getCategories } = require('../controllers/categoryController');

// Todas as rotas de categoria passam pelo authMiddleware
router.use(authMiddleware);

router.post('/', createCategory);
router.get('/', getCategories);

module.exports = router;