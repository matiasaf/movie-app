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
        case 'SET_DETAIL_MOVIE':
            return {
                ...state,
                movieDetail: action.payload,
                loader: false,
            };
        case 'LOADER_ON':
            return {
                ...state,
                loader: true,
            };
        case 'ADD_COMMENT':
            return {
                ...state,
                movieDetail: {
                    ...state.movieDetail,
                    comments: state.movieDetail.comments
                        ? [...state.movieDetail.comments, action.payload]
                        : [action.payload],
                },
            };
        case 'ADD_MOVIES':
            return {
                ...state,
                movies: [...state.movies, ...action.payload],
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
        movieDetail: '',
    });
    return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}
