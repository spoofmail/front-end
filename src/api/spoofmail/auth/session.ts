import { Axios, AxiosResponse } from "axios";

export type RegisterResponse = AxiosResponse<any>

export const getSession = (axios: Axios) => (): Promise<RegisterResponse> => {
    return axios.get('/api/users/session')
}