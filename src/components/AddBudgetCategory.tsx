import React, { useState, useContext } from 'react';
import { BudgetPlanningContext } from '../contexts/BudgetPlanningContext';
import { BudgetCategory } from '../types'; // Import the BudgetCategory type

export const AddBudgetCategory = () => {
  const [name, setName] = useState('');
  const { addCategory } = useContext(BudgetPlanningContext); // Use the context

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      // You can add error handling for empty name input if needed
      console.error('Category name is required');
      return;
    }
    
    // Assuming addCategory is expecting an object of type BudgetCategory
    const newCategory: BudgetCategory = {
      id: Date.now(), // Temporary ID, replace with proper ID logic
      name: name,
      budgetedAmount: 0, // You can add logic to handle budgeted amount input if necessary
      userId: 1, // Replace with the actual user ID from your auth context/state
    };

    try {
      addCategory(newCategory);
      setName(''); // Reset the input field after successful addition
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
