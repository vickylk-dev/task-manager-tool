import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [remember, setRemember] = useState(true);

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
        login(email, password);
        navigate('/');
      } catch (err) {
        setFormError('Unable to sign in. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <Box component="main" className="relative min-h-screen bg-animated-gradient">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-24 h-64 w-64 rounded-full bg-sky-300/40 blur-3xl animate-float animate-delay-2" />
        <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-violet-300/40 blur-3xl animate-float animate-delay-4" />
      </div>

      <Box className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
        <Paper
          elevation={8}
          sx={{ bgcolor: 'common.white' }}
          className="relative w-full max-w-md rounded-lg border border-gray-100 p-8 shadow-[0_10px_40px_rgba(2,6,23,0.08)]"
        >
          <div className="absolute inset-0 rounded-lg ring-1 ring-gray-100" />
          <Box className="relative flex flex-col items-center text-center animate-fade-in">
            <Avatar className="mb-2 bg-blue-600"><LockOutlinedIcon fontSize="small" /></Avatar>
            <Typography component="h1" variant="h6" className="mb-0.5">Welcome back</Typography>
            <Typography variant="body2" className="text-gray-600 text-sm">Sign in to manage your tasks</Typography>

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
                autoComplete="current-password"
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

              <FormControlLabel
                control={<Checkbox size="small" checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                label="Remember me"
              />

              <Button type="submit" fullWidth variant="contained" size="small" disabled={loading} className="transition-transform hover:translate-y-[-1px] text-sm">
                {loading ? (
                  <Box className="flex items-center justify-center gap-2">
                    <CircularProgress color="inherit" size={16} />
                    <span>Signing in...</span>
                  </Box>
                ) : (
                  'Sign In'
                )}
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/signup" className="text-blue-600 hover:underline">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

