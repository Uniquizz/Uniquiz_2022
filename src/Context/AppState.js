import React, { useReducer } from 'react';
import Context from './Context';
import Reducer, { initialState } from './Reducer';
import * as actions from "./Actions"

export default ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const actionsList = {};

    Object.keys(actions).forEach((key) => {
      actionsList[key] = actions[key](dispatch, state);
    });
  
    return (
      <Context.Provider value={{ state, ...actionsList}}>
        {children}
      </Context.Provider>
    );
};