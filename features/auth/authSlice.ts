import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

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

export const postAuth = createAsyncThunk('users/fetchAuth', async () => {  
        const response = await axios.post(BASE_URL + '/login', {
            email: "asdoiajsd",
            password: "iuahhf"
        })
        return response.data;
});

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