import React from 'react';
import Navigation from './src/routes/Navigation';
import { AppProvider } from './AppContext';

export default function App(){
  return (
    <AppProvider>
      <Navigation/>
    </AppProvider>
  );
};

