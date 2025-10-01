import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkBase = `px-3 py-1.5 rounded-md font-semibold text-white`;

  const isActivePath = (path, end = false) => (end ? location.pathname === path : location.pathname.startsWith(path));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backgroundImage: 'linear-gradient(90deg, rgba(2,132,199,0.95) 0%, rgba(34,211,238,0.95) 100%)',
        bgcolor: 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 10px 30px rgba(2,6,23,0.15)'
      }}
    >
      <Toolbar className="mx-auto flex w-full max-w-7xl items-center justify-between px-3">
        <Box className="flex items-center gap-2">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            className="no-underline bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          >
            Task Manager
          </Typography>
        </Box>

        <Box className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink to="/" end>
                {({ isActive }) => (
                  <Button
                    className={navLinkBase}
                    sx={{
                      position: 'relative',
                      color: 'common.white',
                      textTransform: 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 12,
                        right: 12,
                        bottom: 4,
                        height: 3,
                        borderRadius: 9999,
                        bgcolor: '#fbbf24',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 300ms ease',
                    
                      },
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    Dashboard
                  </Button>
                )}
              </NavLink>
              <NavLink to="/add">
                {({ isActive }) => (
                  <Button
                    className={navLinkBase}
                    sx={{
                      position: 'relative',
                      color: 'common.white',
                      textTransform: 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 12,
                        right: 12,
                        bottom: 4,
                        height: 3,
                        borderRadius: 9999,
                        bgcolor: '#fbbf24',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 300ms ease',
                       
                      },
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    Add Task
                  </Button>
                )}
              </NavLink>
              <Button onClick={handleLogout} sx={{ color: 'common.white', textTransform: 'none' }} className="relative px-3 py-1.5 rounded-md transition-colors font-semibold hover:bg-white/10">Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                {({ isActive }) => (
                  <Button sx={{ color: 'common.white', textTransform: 'none' }} className={navLinkClass({ isActive })}>Login</Button>
                )}
              </NavLink>
              <NavLink to="/signup">
                {({ isActive }) => (
                  <Button sx={{ color: 'common.white', textTransform: 'none' }} className={navLinkClass({ isActive })}>Sign Up</Button>
                )}
              </NavLink>
            </>
          )}
        </Box>

        <Box className="md:hidden">
          <IconButton edge="end" color="inherit" onClick={() => setIsMobileOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        PaperProps={{ className: 'w-64 text-white', sx: { backgroundImage: 'linear-gradient(180deg, rgba(2,132,199,1) 0%, rgba(34,211,238,1) 100%)' } }}
      >
        <Box className="flex items-center justify-between px-4 py-3">
          <Typography variant="subtitle1">Menu</Typography>
          <IconButton onClick={() => setIsMobileOpen(false)} color="inherit" aria-label="Close menu">
            <CloseIcon className="text-white" />
          </IconButton>
        </Box>
        <Divider className="border-white/20" />
        <List>
          {isAuthenticated ? (
            <>
              <ListItemButton
                selected={isActivePath('/', true)}
                component={NavLink}
                to="/"
                onClick={() => setIsMobileOpen(false)}
                sx={{ '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)' } }}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                selected={isActivePath('/add')}
                component={NavLink}
                to="/add"
                onClick={() => setIsMobileOpen(false)}
                sx={{ '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)' } }}
              >
                <ListItemText primary="Add Task" />
              </ListItemButton>
              <Divider className="border-white/10" />
              <ListItemButton onClick={() => { setIsMobileOpen(false); handleLogout(); }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton
                selected={isActivePath('/login', true)}
                component={NavLink}
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                sx={{ '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)' } }}
              >
                <ListItemText primary="Login" />
              </ListItemButton>
              <ListItemButton
                selected={isActivePath('/signup', true)}
                component={NavLink}
                to="/signup"
                onClick={() => setIsMobileOpen(false)}
                sx={{ '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)' } }}
              >
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}


