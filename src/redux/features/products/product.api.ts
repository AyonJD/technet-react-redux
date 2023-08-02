import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, commentData }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: ['Comments'], // It's for remove cache of comments when post a new comment. So we can see the new comment without refresh the page. It will remove the cache and automatically call the getComments query for that providesTags: ['Comments']
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['Comments'], // It's for remove cache of comments when post a new comment. So we can see the new comment without refresh the page.
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = productApi;
