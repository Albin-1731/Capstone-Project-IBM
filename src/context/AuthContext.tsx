import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'u001',
    name: 'Ahmad Rizki',
    email: 'user@kickscare.id',
    password: 'password123',
    phone: '08123456789',
    role: 'customer',
    createdAt: '2024-01-15T00:00:00Z',
    address: {
      name: 'Ahmad Rizki',
      phone: '08123456789',
      street: 'Jl. Sudirman No. 123',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
    },
  },
  {
    id: 'u002',
    name: 'Admin KicksCare',
    email: 'admin@kickscare.id',
    password: 'admin123',
    phone: '08987654321',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('kickscare_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userWithoutPassword } = found;
      setUser(userWithoutPassword);
      localStorage.setItem('kickscare_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    const exists = MOCK_USERS.find((u) => u.email === email);
    if (exists) return false;
    const newUser: User = {
      id: 'u' + Date.now(),
      name,
      email,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('kickscare_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kickscare_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('kickscare_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
