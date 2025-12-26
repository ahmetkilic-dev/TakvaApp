import React, { createContext, useContext } from 'react';
import { useDayChange } from '../hooks/useDayChange';

const DayChangeContext = createContext(null);

export function DayChangeProvider({ children }) {
  const dayChangeData = useDayChange();

  return (
    <DayChangeContext.Provider value={dayChangeData}>
      {children}
    </DayChangeContext.Provider>
  );
}

export function useDayChangeContext() {
  const context = useContext(DayChangeContext);
  if (!context) {
    throw new Error('useDayChangeContext must be used within a DayChangeProvider');
  }
  return context;
}

