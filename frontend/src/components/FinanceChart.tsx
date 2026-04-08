import { useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../context/TransactionContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function FinanceChart() {
  const { transactions } = useTransactions();

  const data = useMemo(() => {
    // Agrupar por data para o gráfico (acumulado do dia)
    const grouped = transactions.reduce((acc, curr) => {
      const dateKey = format(new Date(curr.date), 'dd MMM', { locale: ptBR });
      if (!acc[dateKey]) acc[dateKey] = { date: dateKey, balance: 0 };
      acc[dateKey].balance += curr.type === 'income' ? curr.amount : -curr.amount;
      return acc;
    }, {} as Record<string, { date: string; balance: number }>);
    
    // Sort logic is simplified for mockup, just ordered by keys array
    return Object.values(grouped);
  }, [transactions]);

  if (transactions.length === 0) return null;

  return (
    <div className="w-full h-48 md:h-64 mt-12 mb-8 hidden sm:block">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#111827" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 500 }} 
            itemStyle={{ color: '#111827' }}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#111827" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
