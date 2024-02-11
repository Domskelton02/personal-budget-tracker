import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Expense } from '../types';

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (updatedExpense: Expense) => void; // New function for updating an expense
  removeExpense: (id: number) => void;
  isLoading: boolean; // New state for loading status
  error: string | null; // New state for handling errors
};

// Create the context with extended functionalities
const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState<string | null>(null); // Tracks error state

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) => prevExpenses.map((expense) => expense.id === updatedExpense.id ? updatedExpense : expense));
  };

  const removeExpense = (id: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
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
