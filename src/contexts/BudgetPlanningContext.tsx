import React, { createContext, useState } from 'react';
import { BudgetCategory } from '../types';
import { BudgetPlanningService } from '../services/BudgetPlanningService';

// Define the context shape
interface IBudgetPlanningContext {
  categories: BudgetCategory[];
  fetchCategories: () => void;
  addCategory: (category: BudgetCategory) => void;
  updateCategory: (category: BudgetCategory) => void;
  deleteCategory: (id: number) => void;
}

// Initialize the context with default values
export const BudgetPlanningContext = createContext<IBudgetPlanningContext>({
  categories: [],
  fetchCategories: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

export const BudgetPlanningProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  
  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const fetchedCategories = await BudgetPlanningService.getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new category
  const addCategory = async (newCategory: BudgetCategory) => {
    try {
      // Here you would typically call an API service to add the category
      // For now, we just add it to the state directly
      setCategories(prev => [...prev, newCategory]);
    } catch (error) {
      console.error(error);
    }
  };

  // Update an existing category
  const updateCategory = async (updatedCategory: BudgetCategory) => {
    try {
      // Here you would typically call an API service to update the category
      setCategories(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a category
  const deleteCategory = async (id: number) => {
    try {
      // Here you would typically call an API service to delete the category
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
