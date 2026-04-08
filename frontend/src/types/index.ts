export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string; // ISO format
  type: TransactionType;
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}
