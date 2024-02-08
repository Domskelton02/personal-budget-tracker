import React, { useState } from 'react';
import { Income as IncomeType } from '../types';

const initialIncomes: IncomeType[] = [
];

const IncomePage = () => {
    const [incomes, setIncomes] = useState<IncomeType[]>(initialIncomes);
    const [newIncome, setNewIncome] = useState<IncomeType>({
        id: Date.now(),
        userId: 1,
        source: '',
        amount: 0,
        date: '',
        recurring: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewIncome({ ...newIncome, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIncomes([...incomes, newIncome]);
        setNewIncome({
            id: Date.now(),
            userId: 1,
            source: '',
            amount: 0,
            date: '',
            recurring: false,
        });
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
                        <p>Recurring: {income.recurring ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="source"
                    value={newIncome.source}
                    onChange={handleInputChange}
                    placeholder="Source"
                />
                <input
                    type="number"
                    name="amount"
                    value={newIncome.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                />
                <input
                    type="date"
                    name="date"
                    value={newIncome.date}
                    onChange={handleInputChange}
                />
                <label>
                    Recurring:
                    <input
                        type="checkbox"
                        name="recurring"
                        checked={newIncome.recurring}
                        onChange={(e) => setNewIncome({ ...newIncome, recurring: e.target.checked })}
                    />
                </label>
                <button type="submit">Add Income</button>
            </form>
        </div>
    );
};

export default IncomePage;
