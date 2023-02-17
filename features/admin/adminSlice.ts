import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export interface Suggestion {

}

export interface AdminState {
    isAdmin: Boolean;
    status: String;
    error: String | undefined;
    suggestions: Array<Suggestion>;
}

const initialState: AdminState = {
    isAdmin: false,
    status: 'idle',
    error: undefined,
    suggestions: []
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
            .addCase(fetchSuggestions.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.suggestions
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error?.message;
            })
    }
})

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;