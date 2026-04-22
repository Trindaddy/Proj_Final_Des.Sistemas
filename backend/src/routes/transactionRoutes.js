const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createTransaction, getTransactions } = require('../controllers/transactionController');

router.use(authMiddleware);

router.post('/', createTransaction);
router.get('/', getTransactions);

module.exports = router;