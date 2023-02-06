import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface authSliceState {
    username: String | null,
    token: String | null,
    isLoading: Boolean,
    isSuccess: Boolean,
    isError: Boolean,
}

const initialState: authSliceState = {
    username: null,
    token: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
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
    }
})

export const { setUsername, setToken } = authSlice.actions;

export default authSlice.reducer;