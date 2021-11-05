import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./service";
import { postsReducuer } from "./resources/posts";

const reducer = {
  catalogue: postsReducuer,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

store.subscribe(() => {
  localStorage.clear();
  localStorage.catalogueState = JSON.stringify(store.getState().catalogue);
});
