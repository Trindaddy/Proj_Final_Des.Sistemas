/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Transaction } from '../types';
import { mockTransactions } from '../data/mockData';

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  isMockData: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMockData, setIsMockData] = useState(false);
  
  // Hydration via LocalStorage com Lazy Initialization (Premissa nº1)
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const storedData = localStorage.getItem('@finance-app:transactions');
      if (storedData) {
        return JSON.parse(storedData);
      }
      setIsMockData(true);
      return mockTransactions; // Fallback se não existir no LocalStorage
    } catch (error) {
      console.error('Error hydrating from LocalStorage:', error);
      setIsMockData(true);
      return mockTransactions;
    }
  });

  // Effect-based Sync (Premissa nº2)
  useEffect(() => {
    try {
      localStorage.setItem('@finance-app:transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Failed to sync to LocalStorage:', error);
    }
  }, [transactions]);

  // Função utilitária para Delay / "Simulação de Latência" (Premissa nº3)
  const simulateLatency = useCallback((ms = 300) => new Promise(resolve => setTimeout(resolve, ms)), []);

  const addTransaction = async (data: Omit<Transaction, 'id'>) => {
    setIsLoading(true);
    await simulateLatency(400); // Sensação "Premium" não ser seco

    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setIsLoading(false);
  };

  const deleteTransaction = async (id: string) => {
    setIsLoading(true);
    await simulateLatency(300);
    setTransactions((prev) => prev.filter(t => t.id !== id));
    setIsLoading(false);
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
