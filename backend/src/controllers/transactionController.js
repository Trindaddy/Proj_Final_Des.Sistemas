const prisma = require('../config/db');

const createTransaction = async (req, res) => {
    try {
        const { amount, description, date, type, categoryId } = req.body;
        const userId = req.user.userId;

        const transaction = await prisma.transaction.create({
            data: {
                amount,
                description,
                date: new Date(date), // Converte a string do front-end para data do banco
                type,
                categoryId,
                userId
            }
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const userId = req.user.userId;
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            include: { category: true } // Um bônus do Prisma: já traz os dados da categoria junto (JOIN automático)
        });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTransaction, getTransactions };