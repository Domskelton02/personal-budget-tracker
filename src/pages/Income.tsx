import React, { useState } from "react";
import { useIncome } from "../contexts/IncomeProvider";
import { Income as IncomeType } from "../types";

const IncomePage = () => {
  const { addIncome, incomes } = useIncome();
  const [newIncome, setNewIncome] = useState<Omit<IncomeType, "id">>({
    userId: 1,
    source: "",
    amount: 0,
    date: "",
    recurring: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value) || 0
        : value;
    setNewIncome({ ...newIncome, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addIncome({ ...newIncome, id: 0 });
      setNewIncome({
        userId: 1,
        source: "",
        amount: 0,
        date: "",
        recurring: false,
      });
    } catch (error) {
      console.error("Failed to add income:", error);
    }
  };

  return (
    <div>
      <h2>Income</h2>
      <div>
        {incomes.map((income) => (
          <div key={income.id}>
            <p>Source: {income.source}</p>
            <p>Amount: {income.amount}</p>
            <p>Date: {income.date}</p>
            <p>Recurring: {income.recurring ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="source">Source:</label>
        <input
          type="text"
          id="source"
          name="source"
          value={newIncome.source}
          onChange={handleInputChange}
          placeholder="Source"
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={newIncome.amount.toString()}
          onChange={handleInputChange}
          placeholder="Amount"
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={newIncome.date}
          onChange={handleInputChange}
        />

        <label htmlFor="recurring">Recurring:</label>
        <input
          type="checkbox"
          id="recurring"
          name="recurring"
          checked={newIncome.recurring}
          onChange={handleInputChange}
        />

        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default IncomePage;
