import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export function SmartFilters({ searchTerm, onSearchChange, selectedCategory, onCategoryChange, categories }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full p-4 bg-white border border-border rounded-2xl shadow-sm mb-6">
      
      {/* Texto Search */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <Search className="w-4 h-4" />
        </div>
        <Input 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar transação..." 
          className="pl-10 h-10 bg-muted/50 focus-visible:bg-transparent"
        />
      </div>

      {/* Categoria Select Minimalista */}
      <div className="relative w-full md:w-64 flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex h-10 w-full rounded-xl border border-border bg-muted/50 px-10 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:bg-transparent appearance-none"
        >
          <option value="">Todas Categorias</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Dropdown arrow custom minimal */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

    </div>
  );
}
