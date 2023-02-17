import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postSlice from '../features/post/postSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postSlice,
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;