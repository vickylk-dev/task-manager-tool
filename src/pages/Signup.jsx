import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const validate = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setFormError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Minimum 6 characters');
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      try {
        signup(email, password);
        navigate('/');
      } catch (err) {
        setFormError('Unable to sign up. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <Box component="main" className="relative min-h-screen bg-animated-gradient dark:bg-gray-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-300/40 dark:bg-indigo-900/30 blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-24 h-64 w-64 rounded-full bg-sky-300/40 dark:bg-sky-900/30 blur-3xl animate-float animate-delay-2" />
        <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-violet-300/40 dark:bg-violet-900/30 blur-3xl animate-float animate-delay-4" />
      </div>

      <Box className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
        <Paper
          elevation={8}
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
          className="relative w-full max-w-md rounded-lg border border-gray-100 dark:border-gray-700 p-8 shadow-[0_10px_40px_rgba(2,6,23,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 rounded-lg ring-1 ring-gray-100 dark:ring-gray-700" />
          <Box className="relative flex flex-col items-center text-center animate-fade-in">
            <Avatar className="mb-2 bg-green-600"><PersonAddAltIcon fontSize="small" /></Avatar>
            <Typography component="h1" variant="h6" className="mb-0.5">Create your account</Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-300 text-sm">Sign up to start organizing tasks</Typography>

            {formError ? (
              <Alert severity="error" className="mt-4 w-full">{formError}</Alert>
            ) : null}

            <Box component="form" onSubmit={handleSubmit} className="mt-5 w-full space-y-4">
              <TextField
                fullWidth
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(emailError)}
                helperText={emailError}
                autoComplete="email"
                size="small"
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((s) => !s)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                size="small"
              />

              <Button type="submit" fullWidth variant="contained" size="small" disabled={loading} className="transition-transform hover:translate-y-[-1px] text-sm">
                {loading ? (
                  <Box className="flex items-center justify-center gap-2">
                    <CircularProgress color="inherit" size={16} />
                    <span>Creating account...</span>
                  </Box>
                ) : (
                  'Sign Up'
                )}
              </Button>

              <Box className="text-center">
                <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">{"Already have an account? Sign in"}</Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

