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
  const isAuthenticated = true;

  return (
    <AuthProvider>
      <ExpensesProvider>
        <IncomeProvider>
          <BudgetPlanningProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <PrivateRoute isAuthenticated={isAuthenticated}>
                        <HomePage />
                      </PrivateRoute>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/income"
                  element={
                    isAuthenticated ? (
                      <PrivateRoute isAuthenticated={isAuthenticated}>
                        <IncomePage />
                      </PrivateRoute>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/expenses"
                  element={
                    isAuthenticated ? (
                      <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ExpensesPage />
                      </PrivateRoute>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/budget-planning"
                  element={
                    isAuthenticated ? (
                      <PrivateRoute isAuthenticated={isAuthenticated}>
                        <BudgetPlanningPage />
                      </PrivateRoute>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
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
