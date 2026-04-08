/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextData } from '../types/auth';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('@FinanceApp:user');
    const storedToken = localStorage.getItem('@FinanceApp:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    // Simulate initial loading to prevent flashes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password !== '123456') {
          reject(new Error('Senha incorreta. (dica: use 123456)'));
          return;
        }

        const mockUser: User = {
          id: '1',
          name: 'Usuário Demo',
          email,
          avatar: '',
          memberSince: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
        };
        const mockToken = 'mock-jwt-token-xyz';

        localStorage.setItem('@FinanceApp:user', JSON.stringify(mockUser));
        localStorage.setItem('@FinanceApp:token', mockToken);
        
        setUser(mockUser);
        setIsAuthenticated(true);
        resolve();
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) {
          reject(new Error('A senha deve ter pelo menos 6 caracteres.'));
          return;
        }

        const mockUser: User = {
          id: String(Date.now()),
          name,
          email,
          avatar: '',
          memberSince: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
        };
        const mockToken = 'mock-jwt-token-xyz';

        localStorage.setItem('@FinanceApp:user', JSON.stringify(mockUser));
        localStorage.setItem('@FinanceApp:token', mockToken);
        
        setUser(mockUser);
        setIsAuthenticated(true);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('@FinanceApp:user');
    localStorage.removeItem('@FinanceApp:token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    localStorage.setItem('@FinanceApp:user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
