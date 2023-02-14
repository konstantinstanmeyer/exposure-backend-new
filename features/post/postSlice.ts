import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

interface Creator {
    username: String;
    pictureUrl: string;
}

export interface Post {
    category: String,
    creator: Creator,
    description: String,
    imageUrl: string,
    sizing: Number,
    subCategory: String,
    title: String,
    _id: String
}

export interface PostState {
    posts: Post[];
    status: String;
    error: String | undefined;
}

interface GetProps {
    token: String;
    category: String | undefined | string[];
    subCategory: String | undefined | string[];
}

const initialState: PostState = {
    posts: [],
    status: 'idle',
    error: ""
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async(props: GetProps) => {
    console.log(props)
    const { data } = await axios.get(`http://localhost:3001/posts/${props.category}/${props.subCategory}`, {
        headers: { "Authorization": "Bearer " + props.token }
    });
    return data;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'success';
                state.posts = action.payload.posts;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message;
            })
    }
})

export const {  } = postsSlice.actions;

export default postsSlice.reducer;