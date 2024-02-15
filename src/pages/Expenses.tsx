import React, { useState } from "react";
import { useExpensesContext } from "../contexts/ExpensesContext";
import { useCategories } from "../contexts/CategoriesContext";
import { Expense } from "../types";

const ExpensesPage = () => {
  const { addExpense } = useExpensesContext();
  const { categories } = useCategories();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [date, setDate] = useState("");

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !categoryId || !date) {
      alert("All fields are required, including selecting a category.");
      return;
    }

    const newExpense: Expense = {
      id: 0,
      description,
      amount: parseFloat(amount),
      categoryId: Number(categoryId),
      date,
      userId: 1,
    };

    addExpense(newExpense);
    setDescription("");
    setAmount("");
    setCategoryId("");
    setDate("");
  };

  return (
    <div>
      <h2>Expenses</h2>
      <form onSubmit={handleAddExpense}>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter expense description"
        />

        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpensesPage;
