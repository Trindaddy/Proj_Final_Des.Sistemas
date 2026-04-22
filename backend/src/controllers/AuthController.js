const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se o usuário já existe
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Este e-mail já está em uso.' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário no banco
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword
            }
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!', userId: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }

        // Gera o Token JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'SuaChaveSecretaAqui',
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };