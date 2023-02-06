import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface postSliceState {
    category: String;
    subCategory: String;
    description: String;
}

const initialState: postSliceState = {
    category: "",
    subCategory: "",
    description: "",
}

export const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        
    }
})