import {React, createContext, useState, useEffect} from 'react';
import deviceStorage from '../utils/deviceStorage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);

  const logout = async () => {
    setIsLoading(true);
    setUser(null);
    await deviceStorage.deleteItem('user');
    setIsLoading(false);
  };

  const isLoggedin = async () => {
    setIsLoading(true);
    let user = await deviceStorage.loadItem('user');
    if (!user) {
      setIsLoading(false);
      return;
    }
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedin();
  }, []);

  useEffect(() => {
    console.log('user state in context', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{logout, isLoading, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
