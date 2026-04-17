import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  const login = (email, password) => {
    console.log('Login with:', email, password);
    setIsAuthenticated(true);
    setUser({ email, name: 'Користувач' });
  };

  const register = (email, password, name) => {
    console.log('Register:', name, email);
    setIsAuthenticated(true);
    setUser({ email, name });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);