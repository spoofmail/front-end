import { Axios, AxiosResponse } from "axios";

export type RegisterResponse = AxiosResponse<any>

export const register = (axios: Axios) => (body: { username: string, password: string }): Promise<RegisterResponse> => {
    return axios.post('/api/auth/register', body)
}