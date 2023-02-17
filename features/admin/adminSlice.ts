import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export interface Suggestion {
    username: string;
    existingCategory: string | null;
    newCategory: string | null;
    newSubCategory: string | null;
    obscurity: number;
    type: string;
    _id: string;
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
    const response = await axios.get(process.env.NEXT_PUBLIC_DB_URL + 'admin/suggestions', { 
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
    });
    return response.data;
})

export const deleteSuggestion = createAsyncThunk('admin/deleteSuggestion', async(id: string) => {
    const response = await axios.get(process.env.NEXT_PUBLIC_DB_URL + `admin/suggestion/${id}`, {
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
    })
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
                state.suggestions = action.payload;
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error?.message;
            })
            .addCase(deleteSuggestion.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(deleteSuggestion.fulfilled, (state, action) => {
                state.status = 'success';
                console.log(action.payload);
                state.suggestions = [...state.suggestions.filter(suggestion => suggestion._id !== action.payload.id)];
            })
            .addCase(deleteSuggestion.rejected, (state,action) => {
                state.status = 'rejected';
                state.error = action.error?.message;
            })
    }
})

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;