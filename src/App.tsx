import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpensesProvider } from './contexts/ExpensesContext';
import { IncomeProvider } from './contexts/IncomeContext';
import { BudgetPlanningProvider } from './contexts/BudgetPlanningContext';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/Home';
import IncomePage from './pages/Income';
import ExpensesPage from './pages/Expenses';
import BudgetPlanningPage from './pages/BudgetPlanning';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() { ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ExpensesProvider>
      <IncomeProvider>
        <BudgetPlanningProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/homepage" element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              } />
              <Route path="/income" element={
                <PrivateRoute>
                  <IncomePage />
                </PrivateRoute>
              } />
              <Route path="/expenses" element={
                <PrivateRoute>
                  <ExpensesPage />
                </PrivateRoute>
              } />
              <Route path="/budget-planning" element={
                <PrivateRoute>
                  <BudgetPlanningPage />
                </PrivateRoute>
              } />
            </Routes>
          </BrowserRouter>
        </BudgetPlanningProvider>
      </IncomeProvider>
    </ExpensesProvider>
    <Toaster />
  </React.StrictMode>
);
}

export default App;