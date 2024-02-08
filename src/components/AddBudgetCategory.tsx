import React, { useState, useContext } from 'react';
import { BudgetPlanningContext } from '../contexts/BudgetPlanningContext';
import { BudgetCategory } from '../types';
export const AddBudgetCategory = () => {
  const [name, setName] = useState('');
  const { addCategory } = useContext(BudgetPlanningContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      console.error('Category name is required');
      return;
    }
    
    const newCategory: BudgetCategory = {
      id: Date.now(),
      budgetedAmount: 0,
      userId: 1,
    };

    try {
      addCategory(newCategory);
      setName('');
    } catch (error) {
      console.error('Failed to add category', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category name"
      />
      <button type="submit">Add Category</button>
    </form>
  );
};
