export type UserInformation = {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    username: string;
    password: string;
    createdAt: string;
};

export type BudgetCategory = {
    id: number;
    name: string;
    budgetedAmount: number;
    userId: number;
};

export type NewBudgetCategory = Omit<BudgetCategory, 'id'>;
export type NewBudget = Omit<Budget, 'id'>;

export type Expense = {
    id: number;
    userId: number;
    amount: number;
    categoryId: number;
    description: string;
    date: string;
};

export type Income = {
    id: number;
    userId: number;
    source: string;
    amount: number;
    date: string;
    recurring: boolean;
};

export type Budget = {
    id: number;
    userId: number;
    categoryId: number;
    amount: number;
    periodStart: string;
    periodEnd: string;
};