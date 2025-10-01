import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_KEY = 'tm_auth_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(AUTH_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const nextUser = { email };
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const signup = (email, password) => {
    const nextUser = { email };
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    signup,
    logout,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

