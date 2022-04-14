import { Axios, AxiosResponse } from "axios";
import Address from "../../../types/Address";

export type UpdateTagResponse = AxiosResponse<Address>

interface UpdateAddressTagParams {
    id: string
}

interface UpdateAddressTagBody {
    addresstag: string
}

export const updateAddressTag = (axios: Axios) => (params: UpdateAddressTagParams, body: UpdateAddressTagBody): Promise<UpdateTagResponse> => {
    return axios.put(`/api/addresses/${params.id}`, body)
}