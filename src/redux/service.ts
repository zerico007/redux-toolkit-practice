import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "./resources/posts";

type PostsResponse = Post[];

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => "posts",
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = api;
