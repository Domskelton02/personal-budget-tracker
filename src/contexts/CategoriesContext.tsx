import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BudgetCategory, NewBudgetCategory } from '../types';

type CategoriesContextType = {
  categories: BudgetCategory[];
  addCategory: (category: NewBudgetCategory) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
  updateCategory: (id: number, updatedCategory: NewBudgetCategory) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3000/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const addCategory = async (newCategory: NewBudgetCategory) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) throw new Error('Failed to add category');
      const addedCategory = await response.json();
      setCategories((prev) => [...prev, addedCategory]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
    
  };

  const removeCategory = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to remove category');
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
    
  };

  const updateCategory = async (id: number, updatedCategoryInfo: NewBudgetCategory) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategoryInfo),
      });
      if (!response.ok) throw new Error('Failed to update category');
      const updatedCategory = await response.json();
      setCategories((prev) =>
        prev.map((category) => (category.id === id ? updatedCategory : category))
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
    
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, removeCategory, updateCategory, isLoading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
