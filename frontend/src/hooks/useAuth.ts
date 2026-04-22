import { useState } from 'react';
// Importamos o nosso Axios configurado que aponta para a porta 5000 e injeta o Token
import api from '../services/api'; 

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Ajuste a rota '/login' caso a sua rota no Node seja diferente (ex: '/auth/login')
      const response = await api.post('/login', { email, password });
      
      // O backend em Node.js deve estar retornando o token. Salvamos no navegador.
      const { token } = response.data;
      localStorage.setItem('token', token);
      
    } catch (error: any) {
      // Tratamento de erro limpo pegando a mensagem enviada pelo nosso backend Express
      const message = error.response?.data?.error || 'Erro ao fazer login';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Ajuste a rota de criação de usuário do backend
      await api.post('/users', { name, email, password });
      
      // Após registrar, já fazemos o login automático
      await login(email, password);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao criar conta';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    // Lógica para redirecionar o usuário ou limpar estados globais
  };

  return { login, register, logout, isLoading };
};