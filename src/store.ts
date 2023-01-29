import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // user: userReducer,
        // post: postReducer
    },
})

export type AppDispatch = typeof store.dispatch;

export type GlobalDefault = typeof store.getState;