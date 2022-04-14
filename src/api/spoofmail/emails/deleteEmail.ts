import { Axios, AxiosResponse } from "axios";
import Email from "../../../types/Email";

export type DeleteEmailResponse = AxiosResponse<Email>

interface DeleteEmailTagParams {
    id: string
}

export const deleteEmail = (axios: Axios) => (params: DeleteEmailTagParams): Promise<DeleteEmailResponse> => {
    return axios.delete(`/api/messages/${params.id}`)
}