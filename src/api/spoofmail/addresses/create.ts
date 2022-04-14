import { Axios, AxiosResponse } from "axios";
import Address from "../../../types/Address";

export type CreateAddressResponse = AxiosResponse<{
    status: 'success' | 'error'
    message: string
    address: Address
}>

export const createAddress = (axios: Axios) => (body: { addresstag: string }): Promise<CreateAddressResponse> => {
    return axios.post('/api/addresses', body)
}