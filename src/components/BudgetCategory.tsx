import React, { useContext, useState } from 'react';
import { BudgetCategory as BudgetCategoryType } from '../types';
import { BudgetPlanningContext } from '../contexts/BudgetPlanningContext';
import { EditCategoryModal } from './EditCategoryModal';
type Props = {
  category: BudgetCategoryType;
};

export const BudgetCategory: React.FC<Props> = ({ category }) => {
  const { deleteCategory } = useContext(BudgetPlanningContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = (updatedCategory?: BudgetCategoryType) => {
    setIsEditing(false);
    if (updatedCategory) {
      // You can refresh the list or update the state with the new category data
    }
  };

  return (
    <div>
      <span>{category.name}</span>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={() => deleteCategory(category.id)}>Delete</button>

      {isEditing && (
        <EditCategoryModal
          category={category}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
