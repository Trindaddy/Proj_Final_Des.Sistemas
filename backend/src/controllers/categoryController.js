const prisma = require('../config/db');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.userId; // Veio do nosso middleware!

        const category = await prisma.category.create({
            data: { name, userId }
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const userId = req.user.userId;
        const categories = await prisma.category.findMany({
            where: { userId }
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCategory, getCategories };