import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpensesProvider } from './contexts/ExpensesContext';
import { IncomeProvider } from './contexts/IncomeContext';
import { BudgetPlanningProvider } from './contexts/BudgetPlanningContext';
import { AuthProvider } from './contexts/AuthContext';
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
  // Logic to check if the user is authenticated
  // Replace with actual authentication logic
  const isAuthenticated = false;

  return (
<AuthProvider>
  <ExpensesProvider>
    <IncomeProvider>
      <BudgetPlanningProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </PrivateRoute>
            } />
            < Route path="/" element={<LoginPage />} />
            <Route path="/income" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <IncomePage />
              </PrivateRoute>
            } />
            <Route path="/expenses" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ExpensesPage />
              </PrivateRoute>
            } />
            <Route path="/budget-planning" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <BudgetPlanningPage />
              </PrivateRoute>
            } />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </BudgetPlanningProvider>
    </IncomeProvider>
  </ExpensesProvider>
</AuthProvider>
  );
}

export default App;
