import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Expense } from '../types';

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => Promise<void>;
  updateExpense: (updatedExpense: Expense) => Promise<void>;
  removeExpense: (id: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch('http://localhost:3000/expenses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          setExpenses(data);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const addExpense = async (expense: Expense) => {
    try {
      const response = await fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error('Failed to add expense.');
      }
      const newExpense = await response.json();
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    
  };

  const updateExpense = async (updatedExpense: Expense) => {
    try {
      const response = await fetch(`http://localhost:3000/expenses/${updatedExpense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });
      if (!response.ok) {
        throw new Error('Failed to update expense.');
      }
      const newExpense = await response.json();
      setExpenses(prevExpenses =>
        prevExpenses.map(expense => (expense.id === newExpense.id ? newExpense : expense)),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    
  };

  const removeExpense = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove expense.');
      }
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
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
