import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CssBaseline, Container, Box, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import TaskForm from './pages/TaskForm.jsx';
import NotFound from './pages/NotFound.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();
  const { loading } = useAuth();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />
      {!isAuthRoute && <Navbar />}
      {isAuthRoute ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

