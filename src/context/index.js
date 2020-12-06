import React from "react";

export const Context = React.createContext({});

export const UserContext = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [usuario, setUsuario] = React.useState({
    nome: "",
    email: "",
  });

  return (
    <Context.Provider
      value={{ loading, setLoading, isLogin, setIsLogin, usuario, setUsuario }}
    >
      {children}
    </Context.Provider>
  );
};
