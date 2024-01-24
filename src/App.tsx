import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import IncomePage from './pages/Income';
import ExpensesPage from './pages/Expenses';
import BudgetPlanningPage from './pages/BudgetPlanning';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
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
    </>
  );
}

export default App;