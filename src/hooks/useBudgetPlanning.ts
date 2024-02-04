import { useState, useCallback, useContext } from 'react';
import { BudgetPlanningContext } from "../contexts/BudgetPlanningContext";
import { BudgetCategoryType } from '../types';
import { BudgetPlanningService } from '../services/BudgetPlanningService';

export const useBudgetPlanning = () => {
  const { categories, setCategories } = useContext(BudgetPlanningContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from the server
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedCategories = await BudgetPlanningService.getCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [setCategories]);

  // Add a new category
  const addCategory = useCallback(
    async (newCategory: Omit<BudgetCategoryType, 'id'>) => {
      setIsLoading(true);
      try {
        const addedCategory = await BudgetPlanningService.addCategory(newCategory);
        setCategories((prevCategories) => [...prevCategories, addedCategory]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [setCategories]
  );

  // Update an existing category
  const updateCategory = useCallback(
    async (id: number, updatedCategory: BudgetCategoryType) => {
      setIsLoading(true);
      try {
        await BudgetPlanningService.updateCategory(id, updatedCategory);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === id ? updatedCategory : category
          )
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [setCategories]
  );

  // Delete a category
  const deleteCategory = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        await BudgetPlanningService.deleteCategory(id);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [setCategories]
  );

  // Other functions would go here...

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
