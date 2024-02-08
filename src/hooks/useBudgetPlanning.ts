import { useState, useCallback, useContext } from 'react';
import { BudgetPlanningContext } from "../contexts/BudgetPlanningContext";
import { BudgetCategory } from '../types';
import { BudgetPlanningService } from '../services/BudgetPlanningService';

export const useBudgetPlanning = () => {
  const { categories, setCategories } = useContext(BudgetPlanningContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const addCategory = useCallback(
    async (newCategory: Omit<BudgetCategory, 'id'>) => {
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

  const updateCategory = useCallback(
    async (id: number, updatedCategory: BudgetCategory) => {
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
