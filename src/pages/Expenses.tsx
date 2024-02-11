import React, { useState } from 'react';
import { useExpensesContext } from '../contexts/ExpensesContext';
import { Expense, BudgetCategory } from '../types';
import { useCategories } from '../contexts/CategoriesContext';

const ExpensesPage = () => {
  const { expenses, addExpense, removeExpense } = useExpensesContext();
  const { categories } = useCategories();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [date, setDate] = useState('');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!description || !amount || !categoryId || !date) {
      alert('All fields are required, including selecting a category.');
      return;
    }

    const newExpense: Expense = {
      // Assuming your backend will generate IDs
      description,
      amount: parseFloat(amount),
      categoryId: Number(categoryId),
      date,
      // Placeholder for userId, replace with actual user context or authentication mechanism
      userId: 1,
    };

    addExpense(newExpense);
    // Reset form fields
    setDescription('');
    setAmount('');
    setCategoryId('');
    setDate('');
  };

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount}
            <button onClick={() => removeExpense(expense.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter expense description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category: BudgetCategory) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
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
