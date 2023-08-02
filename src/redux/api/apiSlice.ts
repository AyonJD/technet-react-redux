import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Comments'], // It's for remove cache of comments when post a new comment. So we can see the new comment without refresh the page.
  endpoints: () => ({}),
});
