import React, { useState, useContext } from "react";
import { BudgetPlanningContext } from "../contexts/BudgetPlanningContext";
import { BudgetCategory } from "../types";

type EditCategoryProps = {
  category: BudgetCategory;
  onCancel: () => void;
};

export const EditCategory: React.FC<EditCategoryProps> = ({
  category,
  onCancel,
}) => {
  const [name, setName] = useState(category.name);
  const [budgetedAmount, setBudgetedAmount] = useState(
    category.budgetedAmount.toString()
  );
  const { updateCategory } = useContext(BudgetPlanningContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedCategory: BudgetCategory = {
      ...category,
      name,
      budgetedAmount: parseFloat(budgetedAmount),
    };

    try {
      await updateCategory(updatedCategory);
      onCancel();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  return (
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
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
