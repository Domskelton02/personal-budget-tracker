import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import { ExpensesProvider } from './contexts/ExpensesContext';
import { IncomeProvider } from './contexts/IncomeProvider';
import { BudgetPlanningProvider } from './contexts/BudgetPlanningContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import IncomePage from './pages/Income';
import ExpensesPage from './pages/Expenses';
import BudgetPlanningPage from './pages/BudgetPlanning';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
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
                  <Route path="/" element={<PrivateRoute><NavBar></NavBar><HomePage /></PrivateRoute>} />
                  <Route path="/income" element={<PrivateRoute><NavBar></NavBar><IncomePage /></PrivateRoute>} />
                  <Route path="/expenses" element={<PrivateRoute><NavBar></NavBar><ExpensesPage /></PrivateRoute>} />
                  <Route path="/budget-planning" element={<PrivateRoute><NavBar></NavBar><BudgetPlanningPage /></PrivateRoute>} />
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
