import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './login';
import HomePage from './home';
import ConfirmUserPage from './confirm';
import './App.css';

const App = () => {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };

  const authenticated = isAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route (root "/") will redirect to /login if not authenticated */}
        <Route 
          path="/" 
          element={<Navigate replace to={authenticated ? "/home" : "/login"} />} 
        />
        
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirm" element={<ConfirmUserPage />} />

        {/* Protected route for home */}
        <Route 
          path="/home" 
          element={authenticated ? <HomePage /> : <Navigate replace to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
