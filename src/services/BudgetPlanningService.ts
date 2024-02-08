import { BudgetCategory } from '../types';

const BASE_URL = 'http://localhost:3000';

export const BudgetPlanningService = {
  getCategories: async (): Promise<BudgetCategory[]> => {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Error fetching categories');
    }
    return response.json();
  },

  createCategory: async (category: BudgetCategory): Promise<BudgetCategory> => {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error('Error creating category');
    }
    return response.json();
  },

  updateCategory: async (category: BudgetCategory): Promise<BudgetCategory> => {
    const response = await fetch(`${BASE_URL}/categories/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error('Error updating category');
    }
    return response.json();
  },

  deleteCategory: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting category');
    }
    return response.json();
  },
};
