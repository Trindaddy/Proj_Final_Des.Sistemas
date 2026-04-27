const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const transactionRoutes = require('./routes/transactionRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);   // <-- Mudado para plural
app.use('/api/transactions', transactionRoutes); // <-- Mudado para plural

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});