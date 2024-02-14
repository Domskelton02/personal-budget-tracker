import React, { useState, useContext } from 'react';
import { BudgetCategory } from '../types';
import { BudgetPlanningContext } from '../contexts/BudgetPlanningContext';

type EditCategoryModalProps = {
  category: BudgetCategory;
  onClose: (updatedCategory?: BudgetCategory) => void;
};

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, onClose }) => {
  const [name, setName] = useState(category.name);
  const [budgetedAmount, setBudgetedAmount] = useState(
    category.budgetedAmount ? category.budgetedAmount.toString() : '0'
  );
    const [error, setError] = useState('');
  const { updateCategory } = useContext(BudgetPlanningContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear any existing errors

    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    const updatedCategory: BudgetCategory = {
      ...category,
      name,
      budgetedAmount: parseFloat(budgetedAmount),
    };

    try {
      await updateCategory(updatedCategory);
      onClose(updatedCategory); // Close the modal and pass the updated category
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError('Failed to update category. Please try again. ' + errorMessage);
      console.error('Failed to update category', error);
    }
    
  };

  // Function to close the modal if the overlay is clicked
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="categoryName">Category Name</label>
          <input
            id="categoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
          <label htmlFor="budgetedAmount">Budgeted Amount</label>
          <input
            id="budgetedAmount"
            type="number"
            value={budgetedAmount}
            onChange={(e) => setBudgetedAmount(e.target.value)}
            placeholder="Enter budgeted amount"
          />
          <div className="modal-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => onClose()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

