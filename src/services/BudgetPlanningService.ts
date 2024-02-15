import { BudgetCategory, NewBudgetCategory, Budget, NewBudget } from '../types';

const BASE_URL = 'http://localhost:3000';

export const BudgetPlanningService = {
  getCategories: async (): Promise<BudgetCategory[]> => {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Error fetching categories');
    return response.json();
  },

  createCategory: async (newCategoryData: NewBudgetCategory): Promise<BudgetCategory> => {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategoryData),
    });
    if (!response.ok) throw new Error('Error creating category');
    return response.json();
  },

  updateCategory: async (category: BudgetCategory): Promise<BudgetCategory> => {
    const response = await fetch(`${BASE_URL}/categories/${category.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Error updating category');
    return response.json();
  },

  deleteCategory: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/categories/${id}`, { method: 'DELETE' });
  },

  getBudgets: async (): Promise<Budget[]> => {
    const response = await fetch(`${BASE_URL}/budgets`);
    if (!response.ok) throw new Error('Error fetching budgets');
    return response.json();
  },

  createBudget: async (newBudgetData: NewBudget): Promise<Budget> => {
    const response = await fetch(`${BASE_URL}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBudgetData),
    });
    if (!response.ok) throw new Error('Error creating budget');
    return response.json();
  },

  updateBudget: async (budget: Budget): Promise<Budget> => {
    const response = await fetch(`${BASE_URL}/budgets/${budget.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget),
    });
    if (!response.ok) throw new Error('Error updating budget');
    return response.json();
  },

  deleteBudget: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/budgets/${id}`, { method: 'DELETE' });
  },
};