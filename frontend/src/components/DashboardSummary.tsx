import { useMetrics } from '../hooks/useMetrics';
import { formatCurrency } from '../lib/format';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { Skeleton } from './ui/skeleton';

export function DashboardSummary() {
  const { balance, income, expense } = useMetrics();
  const { isLoading } = useTransactions();

  return (
    <section className="flex flex-col gap-8 w-full">
      {/* Massive Typography Hero Balanço */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Saldo Atual</span>
        {isLoading ? (
          <Skeleton className="h-16 w-64 rounded-xl" />
        ) : (
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-foreground tabular-nums">
            {formatCurrency(balance)}
          </h1>
        )}
      </div>

      {/* Cards Minimalistas Asimétricos (Break the Bento Grid slightly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-xl">
        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <span className="text-sm font-medium">Receitas</span>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-32 rounded-lg" />
          ) : (
            <span className="text-2xl font-bold font-sans tracking-tight text-foreground tabular-nums">
              {formatCurrency(income)}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <TrendingDown className="w-4 h-4 text-destructive" />
            </div>
            <span className="text-sm font-medium">Despesas</span>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-32 rounded-lg" />
          ) : (
            <span className="text-2xl font-bold font-sans tracking-tight text-foreground tabular-nums">
              {formatCurrency(expense)}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
