import { Axios, AxiosResponse } from "axios";

export type LoginResponse = AxiosResponse<any>

export const login = (axios: Axios) => (body: { username: string, password: string }): Promise<LoginResponse> => {
    return axios.post('/api/auth/login', body)
}