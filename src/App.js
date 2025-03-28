import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {  ThemeProvider } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import EditUserPage from './pages/EditUserPage';
import Navbar from './components/Navbar';
import theme from './theme';


function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Navbar />
                <UserListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id/edit"
            element={
              <PrivateRoute>
                <Navbar />
                <EditUserPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;