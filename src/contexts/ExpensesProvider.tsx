import React, { createContext, useState, useEffect, useContext, FunctionComponent } from 'react';
import { Expense } from '../types';

interface ExpensesProviderProps {
  children: React.ReactNode;
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => Promise<void>;
  updateExpense: (updatedExpense: Expense) => Promise<void>;
  removeExpense: (id: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: FunctionComponent<ExpensesProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3000/expenses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }
        return response.json();
      })
      .then(data => setExpenses(data))
      .catch(error => setError(error instanceof Error ? error.message : 'An unexpected error occurred'))
      .finally(() => setIsLoading(false));
  }, []);

  const addExpense = async (expense: Expense) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!response.ok) throw new Error('Failed to add expense.');
      
      const newExpense = await response.json();
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  

  const updateExpense = async (updatedExpense: Expense) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/expenses/${updatedExpense.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExpense),
      });
      if (!response.ok) throw new Error('Failed to update expense.');
      const updated = await response.json();
      setExpenses(prevExpenses => prevExpenses.map(exp => exp.id === updated.id ? updated : exp));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const removeExpense = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/expenses/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to remove expense.');
      setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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
