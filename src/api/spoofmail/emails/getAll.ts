import { Axios, AxiosResponse } from "axios";
import Email from "../../../types/Email";

export type GetAllAddressesResponse = AxiosResponse<{
    messages: Array<Email>
    total: number
}>

interface GetEmailsPaginatedOptions {
    page: number
    perPage: number
}

export const getAllEmails = (axios: Axios) => ({
    page = 1,
    perPage = 25,
}: GetEmailsPaginatedOptions): Promise<GetAllAddressesResponse> => {
    return axios.get(`/api/messages/all/${page}?perPage=${perPage}`)
}