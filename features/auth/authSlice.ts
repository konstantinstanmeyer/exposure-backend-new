import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { GlobalDefault } from '@/src/store';

const BASE_URL = 'http://localhost:3001/'

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
        const response = await axios.post('/login', {
            email: "asdoiajsd",
            password: "iuahhf"
        })
        return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setStatus: (state) => {
            if(!localStorage.getItem("username")) return;

            const username = localStorage.getItem('username');
            state.username = username;
        },
        setUsername: (state: GlobalDefault, action: PayloadAction<String>) => {
            state.auth.username = action.payload;
        },
    },
    // extraReducers(builder){
    //     builder.addCase(postAuth.pending, (state))
    // }
})

export default authSlice.reducer;