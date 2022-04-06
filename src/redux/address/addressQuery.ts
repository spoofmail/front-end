import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'universal-cookie';
import Address from '../../types/Address'


let cookies = new Cookies();

// @ts-ignore
window.serverURL = `https://spoofmail-lambda.herokuapp.com`;

// Define a service using a base URL and expected endpoints
export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({
        // @ts-ignore
        baseUrl: `${window.serverURL}/api/`,
        prepareHeaders: (headers) => {
            headers.set('Authorization', cookies.get("token"))

            return headers
        }
    }),
    endpoints: (builder) => ({
        getAllAddresses: builder.query<Array<Address>, string>({
            query: () => `addresses/`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAddressesQuery } = addressApi