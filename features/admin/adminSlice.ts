import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export interface AdminState {
    isAdmin: Boolean;
}

const initialState: AdminState = {
    isAdmin: false,
}

export const fetchSuggestions = createAsyncThunk('admin/fetchSuggestions', async() => {
    const response = await axios.get('http://localhost:3001/admin/suggestions', { 
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
    });
    return response.data;
})


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state: AdminState, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSuggestions.pending, )
    }
})