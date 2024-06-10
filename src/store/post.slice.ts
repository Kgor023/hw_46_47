import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Posts {
  posts: { id: number; title: string; body: string }[];
  loading: boolean;
}

const initialState: Posts = {
  posts: [],
  loading: false,
};

export const getPostThunk = createAsyncThunk("post/getPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ id: number; title: string; body: string }>) => {
      state.posts = [action.payload,...state.posts ];
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPostThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
