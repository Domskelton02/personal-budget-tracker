import { createContext, useContext } from 'react';
import { Income } from '../types';

type IncomeContextType = {
  incomes: Income[];
  addIncome: (income: Income) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

export const useIncome = () => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error('useIncome must be used within an IncomeProvider');
  }
  return context;
};
