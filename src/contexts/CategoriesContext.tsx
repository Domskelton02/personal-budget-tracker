import { createContext, useContext, useState, ReactNode } from 'react';
import { BudgetCategory, NewBudgetCategory } from '../types';

type CategoriesContextType = {
  categories: BudgetCategory[];
  addCategory: (category: NewBudgetCategory) => void;
  removeCategory: (id: number) => void;
  updateCategory: (id: number, updatedCategory: NewBudgetCategory) => void;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);

  const addCategory = (newCategory: NewBudgetCategory) => {
    const newId = Date.now(); // Temporary solution for generating unique ids
    const categoryToAdd: BudgetCategory = { ...newCategory, id: newId };
    setCategories((prevCategories) => [...prevCategories, categoryToAdd]);
  };

  const removeCategory = (id: number) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
  };

  const updateCategory = (id: number, updatedCategoryInfo: NewBudgetCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, ...updatedCategoryInfo } : category
      )
    );
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, removeCategory, updateCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Custom hook to use the CategoriesContext
export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
