import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'

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
        login: (state: any, action: PayloadAction<Object>) => {
            state.token 
        },
        setUsername: (state: any, action: PayloadAction<String>) => {   
            console.log(action.payload + "working");
            state.username = action.payload;
        },
    }
})

console.log("hello", authSlice.reducer, "yes")

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;