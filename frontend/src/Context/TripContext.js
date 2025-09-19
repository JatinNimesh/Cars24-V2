import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import * as api from './api/roadTrips';

const initialState = {
  trips: [],
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, trips: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_OPTIMISTIC':
      return { ...state, trips: [action.payload, ...state.trips] };
    case 'ADD_CONFIRMED':
      // replace temp id with server id
      return {
        ...state,
        trips: state.trips.map(t => (t._tempId === action.meta.tempId ? action.payload : t))
      };
    case 'ROLLBACK_ADD':
      return { ...state, trips: state.trips.filter(t => t._tempId !== action.meta.tempId) };
    // UPDATE / DELETE cases...
    default:
      return state;
  }
}

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadTrips = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.fetchRoadTrips();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Failed to load' });
    }
  }, []);

  // optimistic create example
  const addTrip = useCallback(async (tripData) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic = { ...tripData, _tempId: tempId };
    dispatch({ type: 'ADD_OPTIMISTIC', payload: optimistic });

    try {
      const created = await api.createRoadTrip(tripData);
      dispatch({ type: 'ADD_CONFIRMED', payload: created, meta: { tempId } });
    } catch (err) {
      dispatch({ type: 'ROLLBACK_ADD', meta: { tempId } });
      throw err; // so caller can show error
    }
  }, []);

  useEffect(() => { loadTrips(); }, [loadTrips]);

  return (
    <TripContext.Provider value={{ ...state, loadTrips, addTrip }}>
      {children}
    </TripContext.Provider>
  );
};
