import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Post } from "@/models/post";

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllPosts: build.query<Array<Post>, { limit: number; start: number }>({
      query: ({ limit, start }: { limit: 5; start: 0 }) => ({
        url: '/posts',
        params: {
          _start: start,
          _limit: limit,
        },
      }),
      providesTags: () => ['Post'],
    }),
    createPost: build.mutation<Array<Post>, Post>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: build.mutation<Array<Post>, Post>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: build.mutation<Array<Post>, Post>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
