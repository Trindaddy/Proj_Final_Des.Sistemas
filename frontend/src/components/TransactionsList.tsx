import { useTransactions } from '../context/TransactionContext';
import { formatCurrency, formatDate } from '../lib/format';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function TransactionsList() {
  const { transactions, deleteTransaction, isLoading } = useTransactions();

  // Sort and limit per Strategy A (Last N transactions)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-8 text-center bg-white border border-border rounded-3xl min-h-[300px]">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
          <ArrowDownRight className="w-8 h-8 text-muted-foreground/30" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">Nenhuma transação</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Seu painel financeiro está limpo. Adicione sua primeira receita ou despesa para começar.
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 mt-8 w-full max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Últimas Transações</h2>
        <button className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:bg-muted py-1.5 px-3 rounded-md">
          Ver todas
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {recentTransactions.map((transaction) => {
          const isIncome = transaction.type === 'income';
          return (
            <div 
              key={transaction.id} 
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 px-5 rounded-2xl bg-white border border-border hover:shadow-sm hover:border-accent transition-all duration-200"
            >
              <div className="flex items-center gap-4 w-full">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${isIncome ? 'bg-success/5 text-success' : 'bg-destructive/5 text-destructive'}`}>
                  {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                </div>
                
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-foreground">{transaction.description}</span>
                    <span className={`font-semibold tabular-nums ${isIncome ? 'text-success' : 'text-foreground'}`}>
                      {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-medium">
                      {transaction.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Delete */}
              <button 
                onClick={() => deleteTransaction(transaction.id)}
                disabled={isLoading}
                className="opacity-0 group-hover:opacity-100 sm:ml-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all self-end sm:self-auto disabled:opacity-50 mt-2 sm:mt-0"
                aria-label="Excluir"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 px-5 rounded-2xl bg-white border border-border opacity-50">
             <div className="flex items-center gap-4 w-full">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex flex-col flex-1 gap-2">
                   <div className="flex justify-between w-full">
                      <Skeleton className="w-32 h-5" />
                      <Skeleton className="w-24 h-5" />
                   </div>
                   <Skeleton className="w-20 h-4" />
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
}
