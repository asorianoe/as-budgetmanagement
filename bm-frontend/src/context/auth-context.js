import React from 'react';

const AuthContext = React.createContext({
  currentUser: {},
  register: (first_name, last_name, userId, password) => {},
  login: (userId, password) => {},
  logout: () => {},
});
export default AuthContext;
