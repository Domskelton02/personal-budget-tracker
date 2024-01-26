import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = () => {
        // Replace this with your actual authentication logic
        return true;
    }

    return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default PrivateRoute;