import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./service";

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

const reducer = {
  catalogue: postsSlice.reducer,
  [api.reducerPath]: api.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

store.subscribe(() => {
  localStorage.clear();
  localStorage.catalogueState = JSON.stringify(store.getState().catalogue);
});
