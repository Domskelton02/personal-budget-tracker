import React, { createContext, useState, useEffect, useCallback } from 'react';
import { BudgetCategory } from '../types';
import { BudgetPlanningService } from '../services/BudgetPlanningService';

interface IBudgetPlanningContext {
  categories: BudgetCategory[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Omit<BudgetCategory, 'id'>) => Promise<void>;
  updateCategory: (category: BudgetCategory) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const BudgetPlanningContext = createContext<IBudgetPlanningContext | undefined>(undefined);

export const BudgetPlanningProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedCategories = await BudgetPlanningService.getCategories();
      setCategories(fetchedCategories);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCategory = useCallback(async (category: Omit<BudgetCategory, 'id'>) => {
    setIsLoading(true);
    try {
      const addedCategory = await BudgetPlanningService.createCategory(category);
      setCategories(prev => [...prev, addedCategory]);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to add category');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (updatedCategory: BudgetCategory) => {
    setIsLoading(true);
    try {
      await BudgetPlanningService.updateCategory(updatedCategory);
      setCategories(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to update category');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      await BudgetPlanningService.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to delete category');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <BudgetPlanningContext.Provider value={{ categories, isLoading, error, fetchCategories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </BudgetPlanningContext.Provider>
  );
};
