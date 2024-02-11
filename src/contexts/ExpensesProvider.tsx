import React, { createContext, useState, useEffect, useContext, FunctionComponent, ReactNode } from 'react';
import { Expense } from '../types';
interface ExpensesProviderProps {
  children: ReactNode;
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (updatedExpense: Expense) => void;
  removeExpense: (id: number) => void;
  isLoading: boolean;
  error: string | null;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: FunctionComponent<ExpensesProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/expenses');
        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }
        const data: Expense[] = await response.json();
        if (isMounted) {
          setExpenses(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchExpenses();

    return () => {
      isMounted = false;
    };
  }, []);

  const addExpense = (expense: Expense) => {
    setExpenses(prevExpenses => [...prevExpenses, expense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense)
    );
  };

  const removeExpense = (id: number) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, updateExpense, removeExpense, isLoading, error }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpensesContext must be used within an ExpensesProvider');
  }
  return context;
};
