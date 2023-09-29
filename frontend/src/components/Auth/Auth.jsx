import React, { useCallback, useMemo, useState } from 'react';
import AuthContext from './AuthContext.js';

const Auth = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUserData ? {
    username: savedUserData.username,
    token: savedUserData.token,
  } : null);
  const logIn = useCallback((data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser({ username: data.username, token: data.token });
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const proData = useMemo(() => ({
    logIn,
    logOut,
    user,
  }), [logIn, logOut, user]);

  return (
    <AuthContext.Provider value={proData}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
