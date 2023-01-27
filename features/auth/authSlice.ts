import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token') as string | null;
const username: String | null = localStorage.getItem('username');

const BASE_URL = 'http://localhost:3001/'

interface authSliceState {
    username: String | null,
    token: String | null,
    isLoading: Boolean,
    isSuccess: Boolean,
    isError: Boolean,
}

const initialState: authSliceState = {
    username: username,
    token: token ? token : null,
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
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setStatus: (state) => {
            if(!localStorage.getItem("username")) return;

            const username = localStorage.getItem('username');
            state.username = username;
        },
        login: (state, action: PayloadAction<any>) => {
            const email = action.payload.email;
            const password = action.payload.password;

        },
    },
    // extraReducers(builder){
    //     builder.addCase(postAuth.pending, (state))
    // }
})

export default authSlice.reducer;