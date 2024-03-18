import {React, createContext, useState, useEffect} from 'react';
import deviceStorage from '../utils/deviceStorage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const logout = async () => {
    setIsLoading(true);
    setToken(null);
    setUser(null);
    await deviceStorage.deleteItem('token');
    await deviceStorage.deleteItem('user');
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('user state in context', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{logout, isLoading, token, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
