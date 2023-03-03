import React, { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import { AuthReducer } from './AuthReducer';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
}

export const AuthContext = createContext(INITIAL_STATE);

export function AuthContextProvider(props) {

    const [userState, dispatchUserState] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userState.user));
    }, [userState.user]);

    return (
        <AuthContext.Provider value={{ user: userState.user, dispatchUserState }}>
            {props.children}
        </AuthContext.Provider>
    )
}