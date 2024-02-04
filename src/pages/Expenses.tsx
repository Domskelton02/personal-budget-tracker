import React, { useState, useEffect } from 'react';
import { Expense } from '../types'; // Adjust the import based on your actual type definitions
import { useExpensesContext } from '../contexts/ExpensesContext'; // Adjust this as well if needed

const ExpensesPage = () => {
  const { expenses, addExpense, removeExpense } = useExpensesContext();
  const [newExpense, setNewExpense] = useState('');

  // Function to handle the form submission
  const handleAddExpense = (e) => {
    e.preventDefault();
    addExpense(newExpense);
    setNewExpense(''); // Reset the input after adding
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
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          placeholder="Enter expense description"
        />
        <input type="number" placeholder="Enter amount" />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpensesPage;
