import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Credential {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  sigIn(credentials: Credential): Promise<void>;
  sigOut(credentials: Credential): void;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:token');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const sigIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:token', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const sigOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, sigIn, sigOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
