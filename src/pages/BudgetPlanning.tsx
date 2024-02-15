import { AddBudgetCategory } from "../components/AddBudgetCategory";
import { BudgetCategory } from "../components/BudgetCategory";
import { useBudgetPlanning } from "../hooks/useBudgetPlanning";

const BudgetPlanningPage = () => {
  const { categories, handleAddCategory } = useBudgetPlanning();

  return (
    <div>
      <h2>Budget Planning</h2>
      <AddBudgetCategory onAddCategory={handleAddCategory} />
      {categories.map((category) => (
        <BudgetCategory key={category.id} category={category} />
      ))}
    </div>
  );
};

export default BudgetPlanningPage;
