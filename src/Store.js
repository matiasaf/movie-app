import React, { useReducer, createContext } from 'react';

export const CTX = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'SET_AUTH_USER':
            return {
                ...state,
                loggedUser: action.payload,
            };
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.payload,
                loader: false,
            };
        case 'LOADER_ON':
            return {
                ...state,
                loader: true,
            };

        default:
            return state;
    }
}

export default function Store(props) {
    const reducerHook = useReducer(reducer, {
        loggedUser: '',
        movies: [],
        loader: false,
    });
    return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}
