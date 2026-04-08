import { useState } from 'react';
import { DashboardSummary } from '../components/DashboardSummary';
import { FinanceChart } from '../components/FinanceChart';
import { TransactionsList } from '../components/TransactionsList';
import { AddTransactionModal } from '../components/AddTransactionModal';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between w-full mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-foreground text-background rounded-2xl flex md:hidden items-center justify-center font-bold font-sans text-xl">
            F.
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight">Financial Control</h2>
            <p className="text-sm text-muted-foreground hidden sm:block">Acompanhamento e evolução mensal</p>
          </div>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-sm whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Nova transação
        </Button>
      </header>

      <DashboardSummary />
      <FinanceChart />
      <TransactionsList />
      
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
