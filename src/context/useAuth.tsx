import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { name: string; role: 'admin' | 'user' } | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string, asAdmin?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: 'admin' | 'user' | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'oh_auth_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }, [user]);

  const login = async (email: string, password: string, asAdmin = false) => {
    // mock auth: any non-empty credentials succeed
    if (!email || !password) return false;
    const u: User = { name: email.split('@')[0], role: asAdmin ? 'admin' : 'user' };
    setUser(u);
    return true;
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) return false;
    setUser({ name, role: 'user' });
    return true;
  };

  const logout = () => setUser(null);

  const value: AuthContextType = { user, login, register, logout, isAuthenticated: !!user, userRole: user?.role ?? null };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
