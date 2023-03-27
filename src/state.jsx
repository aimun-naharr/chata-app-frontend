import React, { createContext, useReducer } from 'react';

export const CounterContext = createContext();

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};


export const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
    return (
      <CounterContext.Provider value={{ state, dispatch }}>
        {children}
      </CounterContext.Provider>
    );
  };