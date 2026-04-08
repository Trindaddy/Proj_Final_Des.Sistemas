import { useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';

export function useMetrics() {
  const { transactions } = useTransactions();

  const metrics = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
          acc.balance += transaction.amount;
        } else {
          acc.expense += transaction.amount;
          acc.balance -= transaction.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  return metrics;
}
