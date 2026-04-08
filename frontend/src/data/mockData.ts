import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário Geração Premium',
    amount: 15400,
    category: 'Salário',
    date: new Date(new Date().setDate(2)).toISOString(), // Dia 2 do mês atual
    type: 'income',
  },
  {
    id: '2',
    description: 'Aluguel Escritório',
    amount: 3200,
    category: 'Moradia',
    date: new Date(new Date().setDate(5)).toISOString(), // Dia 5
    type: 'expense',
  },
  {
    id: '3',
    description: 'Jantar Restaurante',
    amount: 450,
    category: 'Alimentação',
    date: new Date(new Date().setDate(8)).toISOString(), // Dia 8
    type: 'expense',
  },
  {
    id: '4',
    description: 'Consultoria Frontend',
    amount: 5000,
    category: 'Freelance',
    date: new Date(new Date().setDate(12)).toISOString(), // Dia 12
    type: 'income',
  },
  {
    id: '5',
    description: 'Assinaturas de Software (Vários)',
    amount: 250,
    category: 'Ferramentas',
    date: new Date(new Date().setDate(15)).toISOString(), // Dia 15
    type: 'expense',
  },
  {
    id: '6',
    description: 'Viagem de Negócios (Uber)',
    amount: 120,
    category: 'Transporte',
    date: new Date(new Date().setDate(16)).toISOString(), // Dia 16
    type: 'expense',
  },
];
