import React, { useState, useEffect } from 'react';
import { Expense } from '../types';
import { useExpensesContext } from '../contexts/ExpensesContext';

const ExpensesPage = () => {
  const { expenses, addExpense, removeExpense } = useExpensesContext();
  const [newExpense, setNewExpense] = useState('');

  const handleAddExpense = (e) => {
    e.preventDefault();
    addExpense(newExpense);
    setNewExpense('');
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
