import React, { useContext } from 'react';
import { BudgetCategory as BudgetCategoryType } from '../types';
import { BudgetPlanningContext } from '../contexts/BudgetPlanningContext';

type Props = {
  category: BudgetCategoryType;
};

export const BudgetCategory: React.FC<Props> = ({ category }) => {
  const { deleteCategory, editCategory } = useContext(BudgetPlanningContext); // Extract methods from context

  return (
    <div>
      <span>{category.name}</span>
      {}
      <button onClick={() => editCategory(category)}>Edit</button>
      <button onClick={() => deleteCategory(category.id)}>Delete</button>
    </div>
  );
};
