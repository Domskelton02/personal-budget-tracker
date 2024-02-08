// Represents a user's personal information
export type UserInformation = {
    firstName: string; // User's first name
    lastName: string; // User's last name
    email: string; // User's email address
    city: string; // User's city
    state: string; // User's state
    zipCode: string; // User's ZIP code
    phone: string; // User's phone number
    username: string;
    password: string;
    createdAt: string;
};


// Represents a category within a user's budget
export type BudgetCategory = {
    id: number; // Unique identifier for the category
    name: string; // Name of the budget category
    budgetedAmount: number; // Amount of money budgeted for this category
    userId: number; // ID of the user to whom the category belongs
};

// Represents an expense recorded by a user
export type Expense = {
    id: number; // Unique identifier for the expense
    userId: number; // ID of the user who recorded the expense
    amount: number; // Numeric value of the expense
    categoryId: number; // ID of the budget category to which this expense belongs
    description: string; // Description of the expense
    date: string; // Date when the expense occurred (format: 'YYYY-MM-DD')
};


// Represents income received by a user
export type Income = {
    id: number; // Unique identifier for the income record
    userId: number; // ID of the user who received the income
    source: string; // Description of the income source (e.g., 'Job', 'Investment')
    amount: number; // Numeric value of the income
    date: string; // Date when the income was received (format: 'YYYY-MM-DD')
    recurring: boolean; // Indicates whether the income is recurring
};

// Represents a user's budget for a specific category over a time period
export type Budget = {
    id: number; // Unique identifier for the budget record
    userId: number; // ID of the user to whom the budget applies
    categoryId: number; // ID of the category this budget is for
    amount: number; // Total amount allocated for the budget
    periodStart: string; // Start date of the budget period (format: 'YYYY-MM-DD')
    periodEnd: string; // End date of the budget period (format: 'YYYY-MM-DD')
};
