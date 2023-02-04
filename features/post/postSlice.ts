import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface postSliceState {
    category: String;
    subCategory: String;
    obscurity: Number;
    description: String;
    imageUrl: String;
}