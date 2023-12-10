'use client';

import React, { createContext, useState } from 'react';

type AuthType = {
  isLoggedIn: boolean;
  token: string;
};

type AuthStateType = {
  authState: AuthType;
  setAuthState: (authState: AuthType) => void;
};

export const AuthContext = createContext<AuthStateType>({
  authState: { isLoggedIn: false, token: '' },
  setAuthState: () => {}
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthType>({
    isLoggedIn: false,
    token: ''
  });
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
