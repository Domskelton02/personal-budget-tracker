import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Income } from "../types";

export const IncomeContext = createContext<
  | {
      incomes: Income[];
      addIncome: (income: Income) => Promise<void>;
      isLoading: boolean;
      error: string | null;
    }
  | undefined
>(undefined);

type IncomeProviderProps = {
  children: ReactNode;
};

export const IncomeProvider: React.FC<IncomeProviderProps> = ({ children }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchIncomes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/incomes");
        if (!response.ok) {
          throw new Error("Failed to fetch incomes.");
        }
        const data = await response.json();
        if (isMounted) {
          setIncomes(data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncomes();

    return () => {
      isMounted = false;
    };
  }, []);

  const addIncome = async (income: Income) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/incomes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(income),
      });
      if (!response.ok) {
        throw new Error("Failed to add income.");
      }
      const newIncome = await response.json();
      setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IncomeContext.Provider value={{ incomes, addIncome, isLoading, error }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => {
  const context = React.useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncome must be used within an IncomeProvider");
  }
  return context;
};
