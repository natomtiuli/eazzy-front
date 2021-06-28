import React, {createContext, useContext, useState} from 'react';

export const UserContext = createContext({
  user: localStorage.getItem("user"),
  setUser: () => {
  },
});

export const UserContextProvider = (props) => {
  const [state, setState] = useState(JSON.parse(localStorage.getItem("user")));
  const [accessToken, setAccessToken] = useState();

  const setUser = (user) => {
    setState(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const resetUser = () => {
    setState(null);
    localStorage.removeItem('user');
    setAccessToken(null);
  };

  const hasRole = roles => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user?.role || null;
    return roles.some(r => r === userRole?.name);
  };

  return (
    <UserContext.Provider value={{
      user: state,
      setUser: setUser,
      accessToken: accessToken,
      setAccessToken: setAccessToken,
      resetUser: resetUser,
      hasRole: hasRole,
    }}>
      {props.children}
    </UserContext.Provider>
  );
}
