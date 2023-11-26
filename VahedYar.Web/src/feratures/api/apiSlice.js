import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
    }),
    endpoints: builder => ({

        getUniversiy: builder.query({
            query: () => ({
                url: '/University/GetAll',
            }),
        }),
        submitUserInfo: builder.mutation({
            query: (id) => ({
                url: `/Course/GetGroupCourses`,
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ id }),
            }) 
        }),
        submitFiters: builder.mutation({
            query: (filter) => ({
                url: `/TimeTable/Get`,
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(filter),
            }) 
        }),
        login: builder.mutation({
            query: (User) => ({
                url: `/auth/login`,
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(User),
            })
        }),
        signup: builder.mutation({
            query: (User) => ({
                url: `/auth/signup`,
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(User),
            })
        }),
        logout: builder.query({
            query: () => ({
                url: '/auth/logout',
            }),
        }),
    }),
    keepUnusedDataFor:  10 * 60 * 1000,
})
export const {
    useGetUniversiyQuery,
    useSubmitUserInfoMutation,
    useSubmitFitersMutation,
    useLoginMutation,
    useSignupMutation,
    useLogoutQuery,
} = apiSlice