import { Axios, AxiosResponse } from "axios";
import Address from "../../../types/Address";

export type GetAllAddressesResponse = AxiosResponse<{
    status: 'success' | 'error'
    message: string
    addresses: Array<Address>
}>

export const getAllAddresses = (axios: Axios) => (): Promise<GetAllAddressesResponse> => {
    return axios.get('/api/addresses')
}