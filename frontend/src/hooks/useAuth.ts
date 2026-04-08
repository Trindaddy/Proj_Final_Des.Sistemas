import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextData } from '../types/auth';

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  
  if (Object.keys(context).length === 0) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
