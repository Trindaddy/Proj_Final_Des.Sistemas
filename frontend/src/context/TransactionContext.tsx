/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Transaction } from '../types';
import api from '../services/api'; // <-- Conectando o Axios

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  isMockData: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMockData, setIsMockData] = useState(false);

  // Busca as transações reais da API ao carregar o contexto
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/transactions');
      
      // Mapeamento: O backend retorna número (1 ou 0), o front precisa de 'income' ou 'expense'
      const formattedTransactions = response.data.map((t: any) => ({
        id: t.id,
        description: t.description,
        amount: t.amount,
        date: t.date,
        // Traduzindo do banco para a tela:
        type: t.type === 1 ? 'income' : 'expense', 
        // Se o backend usar relação com Categoria, pegamos o nome:
        category: t.category?.name || 'Geral' 
      }));

      setTransactions(formattedTransactions);
      setIsMockData(false);
    } catch (error) {
      console.error('Erro ao buscar transações da API:', error);
      // Se falhar, você pode optar por deixar a lista vazia ou carregar mockData aqui
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega as transações assim que o componente é montado
  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (data: Omit<Transaction, 'id'>) => {
    setIsLoading(true);
    try {
      // Precisamos converter o texto 'income'/'expense' de volta para Número antes de enviar
      const backendPayload = {
        description: data.description,
        amount: data.amount,
        date: data.date,
        type: data.type === 'income' ? 1 : 0,
        categoryId: data.category // Atenção: o backend espera o ID da categoria, não o nome em texto!
      };

      await api.post('/transactions', backendPayload);
      
      // Recarrega a lista do banco para garantir que temos o ID real do SQLite
      await fetchTransactions();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, isLoading, addTransaction, deleteTransaction, isMockData }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};