import { Axios, AxiosResponse } from "axios";
import Address from "../../../types/Address";

export type DeleteAddressResponse = AxiosResponse<Address>

interface DeleteAddressTagParams {
    id: string
}

export const deleteAddress = (axios: Axios) => (params: DeleteAddressTagParams): Promise<DeleteAddressResponse> => {
    return axios.delete(`/api/addresses/${params.id}`)
}