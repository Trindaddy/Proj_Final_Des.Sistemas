
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutGrid, List, Settings, HelpCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AppLayout = () => {
  const { user } = useAuth();
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
      {/* Sidebar super minimalista */}
      <nav className="hidden md:flex flex-col items-center justify-between w-20 py-8 border-r border-border bg-white sticky top-0 h-screen">
        <div className="flex flex-col items-center gap-8 w-full">
          <NavLink 
            to="/profile"
            className={({ isActive }) => `w-10 h-10 rounded-2xl flex items-center justify-center font-bold font-sans text-lg cursor-pointer flex-shrink-0 transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'bg-foreground text-background hover:bg-foreground/90'}`}
            title="Perfil"
          >
            {initial}
          </NavLink>
          
          <div className="flex flex-col gap-6 w-full items-center">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `p-3 rounded-2xl transition-colors ${isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
              title="Dashboard"
            >
              <LayoutGrid className="w-5 h-5" />
            </NavLink>
            
            <NavLink 
              to="/historico" 
              className={({ isActive }) => `p-3 rounded-2xl transition-colors ${isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
              title="Extrato Completo"
            >
              <List className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 text-muted-foreground items-center">
          <button className="p-3 hover:bg-muted/50 hover:text-foreground rounded-2xl transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-3 hover:bg-muted/50 hover:text-foreground rounded-2xl transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content Stream */}
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-6 md:p-12 pb-24 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
