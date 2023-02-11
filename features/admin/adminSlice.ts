import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AdminState {
    isAdmin: Boolean;

}

const initialState: AdminState = {
    isAdmin: false,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    }
})