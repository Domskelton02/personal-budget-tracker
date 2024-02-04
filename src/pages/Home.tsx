import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Personal Budget Tracker</h1>
            <p>Manage your finances efficiently and effectively.</p>
            <div className="home-links">
                <Link to="/income">Manage Income</Link>
                <Link to="/expenses">Track Expenses</Link>
                <Link to="/budget-planning">Plan Budget</Link>
            </div>
        </div>
    );
};

export default HomePage;
