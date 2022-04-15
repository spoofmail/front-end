import { Axios, AxiosResponse } from "axios";
import Email from "../../../types/Email";

export type GetByTextResponse = AxiosResponse<{
    status: 'success' | 'error'
    message: string
    emails: Array<Email>
    total: number
}>

interface GetByTextOptions {
    query: string
    from: number
    size: number
}

export const getByText = (axios: Axios) => ({
    query,
    from,
    size,
}: GetByTextOptions): Promise<GetByTextResponse> => {
    return axios.post(`/api/messages/search/`, {
        query,
        from,
        size,
    })
}