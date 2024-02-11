import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ExpensesProvider } from './contexts/ExpensesContext';
import { IncomeProvider } from './contexts/IncomeContext';
import { BudgetPlanningProvider } from './contexts/BudgetPlanningContext';
import { CategoriesProvider } from './contexts/CategoriesContext'; // Make sure this is correctly imported
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import IncomePage from './pages/Income';
import ExpensesPage from './pages/Expenses';
import BudgetPlanningPage from './pages/BudgetPlanning';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  const isAuthenticated = true; // This should be dynamically set based on the logged-in user state

  // Wrap your routes with PrivateRoute where needed
  const privateRoute = (children) => (
    isAuthenticated ? children : <Navigate to="/login" />
  );

  return (
    <AuthProvider>
      <ExpensesProvider>
        <IncomeProvider>
          <BudgetPlanningProvider>
            <CategoriesProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={privateRoute(<HomePage />)} />
                  <Route path="/income" element={privateRoute(<IncomePage />)} />
                  <Route path="/expenses" element={privateRoute(<ExpensesPage />)} />
                  <Route path="/budget-planning" element={privateRoute(<BudgetPlanningPage />)} />
                </Routes>
                <Toaster />
              </BrowserRouter>
            </CategoriesProvider>
          </BudgetPlanningProvider>
        </IncomeProvider>
      </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
