import React, { createContext, useState } from 'react';
import { BudgetCategory } from '../types';
import { BudgetPlanningService } from '../services/BudgetPlanningService';

interface IBudgetPlanningContext {
  categories: BudgetCategory[];
  fetchCategories: () => void;
  addCategory: (category: BudgetCategory) => void;
  updateCategory: (category: BudgetCategory) => void;
  deleteCategory: (id: number) => void;
}

export const BudgetPlanningContext = createContext<IBudgetPlanningContext>({
  categories: [],
  fetchCategories: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

export const BudgetPlanningProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  
  const fetchCategories = async () => {
    try {
      const fetchedCategories = await BudgetPlanningService.getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error(error);
    }
  };


  const addCategory = async (newCategory: BudgetCategory) => {
    try {
      setCategories(prev => [...prev, newCategory]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategory = async (updatedCategory: BudgetCategory) => {
    try {
      setCategories(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BudgetPlanningContext.Provider value={{
      categories,
      fetchCategories,
      addCategory,
      updateCategory,
      deleteCategory,
    }}>
      {children}
    </BudgetPlanningContext.Provider>
  );
};
