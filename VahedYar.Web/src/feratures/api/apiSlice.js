import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    

    baseQuery: fetchBaseQuery({
        //baseUrl: 'http://localhost:5269/api',
        baseUrl: 'https://localhost:7208/api',
        //arya
        //baseUrl: 'http://192.168.10.26:45455/api',

        //deploy
        //baseUrl:'http://5.160.82.66:11025/api',
    }),
    endpoints: builder => ({
        //TODO: user authenticatoin should be added 
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
        })
    }),
    keepUnusedDataor:  10 * 60 * 1000,
})
export const {
    useGetUniversiyQuery,
    useSubmitUserInfoMutation,
    useSubmitFitersMutation
} = apiSlice