import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [listaZonas, setListaZonas] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaObservaciones, setListaObservaciones] = useState([]);
  const [listaInsumos, setListaInsumos] = useState([]);


  const contextValue = {
    listaZonas,
    setListaZonas,
    listaUsuarios,
    setListaUsuarios,
    listaObservaciones,
    setListaObservaciones,
    listaInsumos,
    setListaInsumos
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
