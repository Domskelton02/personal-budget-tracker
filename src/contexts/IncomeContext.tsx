import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Income as IncomeType } from '../types'; // Adjust the path as necessary

type IncomeContextType = {
    incomes: IncomeType[];
    addIncome: (income: IncomeType) => void;
};

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

type IncomeProviderProps = {
    children: ReactNode;
};

export const IncomeProvider = ({ children }: IncomeProviderProps) => {
    const [incomes, setIncomes] = useState<IncomeType[]>([]);

    const addIncome = (income: IncomeType) => {
        setIncomes((prevIncomes) => [...prevIncomes, income]);
    };

    return (
        <IncomeContext.Provider value={{ incomes, addIncome }}>
            {children}
        </IncomeContext.Provider>
    );
};

export const useIncome = () => {
    const context = useContext(IncomeContext);
    if (!context) {
        throw new Error('useIncome must be used within an IncomeProvider');
    }
    return context;
};
