const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // <-- ADICIONADO
const transactionRoutes = require('./routes/transactionRoutes'); // <-- ADICIONADO

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes); // <-- ADICIONADO
app.use('/api/transaction', transactionRoutes); // <-- ADICIONADO

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});