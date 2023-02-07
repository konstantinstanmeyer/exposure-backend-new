import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface authSliceState {
    username: String | null,
    token: String | null,
    isLoading: Boolean,
    isSuccess: Boolean,
    isError: Boolean,
    error: String | null
}

const initialState: authSliceState = {
    username: null,
    token: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state: authSliceState, action: PayloadAction<String | null>) => {   
            state.username = action.payload;
        },
        setToken: (state: authSliceState, action: PayloadAction<String | null>) => {   
            state.token = action.payload;
        },
        setError: (state: authSliceState, action: PayloadAction<String | null>) => {
            state.error = action.payload;
        }
    }
})

export const { setUsername, setToken, setError } = authSlice.actions;

export default authSlice.reducer;