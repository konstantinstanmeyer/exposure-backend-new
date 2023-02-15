import { createSlice, PayloadAction, createAsyncThunk, current } from '@reduxjs/toolkit'
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
    _id: String,
}
interface GetProps {
    token: String;
    category: String | undefined | string[];
    subCategory: String | undefined | string[];
}

export interface PostState {
    posts: Post[];
    status: String;
    error: String | undefined;
    subCategory: string | string[] | undefined;
    previous: null | string;
    editPostId: String | null
}

const initialState: PostState = {
    posts: [],
    status: 'idle',
    error: "",
    subCategory: undefined,
    previous: null,
    editPostId: null
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
        setSubCategory: (state: PostState, action: PayloadAction<string | undefined | string[]>) => {
            if (state.subCategory && state.subCategory !== action.payload){
                state.subCategory = action.payload;
                console.log("change");
                state.posts = [];
                state.status = 'idle';
            }
            state.subCategory = action.payload;
            console.log(`${action.payload} + ${current(state)}`)
            console.log(JSON.stringify(state, undefined, 2))
        },
        setEditPostId: (state: PostState, action: PayloadAction<String>) => {
            state.editPostId = action.payload;
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                if (action.payload.posts.length >= 1){
                    state.posts = action.payload.posts;
                    state.status = 'success';
                } else {
                    state.status = "none";
                }
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message;
            })
    }
})

export const { setSubCategory, setEditPostId } = postsSlice.actions;

export default postsSlice.reducer;