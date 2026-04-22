const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Pega o header de autorização
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido ou inválido.' });
    }

    // Extrai apenas o código do token (tira a palavra "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // Verifica se o token é válido e extrai o ID do usuário
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SuaChaveSecretaAqui');
        
        // Pendura o ID do usuário na requisição para os próximos métodos usarem (equivalente ao seu GetUserId())
        req.user = { userId: decoded.userId };
        
        next(); // Libera a entrada!
    } catch (error) {
        return res.status(401).json({ message: 'Token expirado ou inválido.' });
    }
};

module.exports = authMiddleware;