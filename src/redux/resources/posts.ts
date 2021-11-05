import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  title: string;
  id?: number;
  userId: number;
  body: string;
}
export interface PostState {
  posts: Post[];
}

const initialState: PostState = localStorage.catalogueState
  ? JSON.parse(localStorage.catalogueState)
  : { posts: [] };

const postsSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    insertPosts: (state, { payload }: PayloadAction<Post[]>) => {
      state.posts = [...payload];
    },
    addPost: (state, { payload }: PayloadAction<Post>) => {
      state.posts.unshift(payload);
    },
  },
});

export const { insertPosts, addPost } = postsSlice.actions;
export const postsReducuer = postsSlice.reducer;
