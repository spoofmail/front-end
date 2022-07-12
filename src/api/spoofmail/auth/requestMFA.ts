import { Axios, AxiosResponse } from "axios";

export type RequestMFAResponse = AxiosResponse<{
    status: 'success' | 'error'
    message: 'MFA is already enabled for this user'
    otpauth_url: string
    base32: string
    mfaRequestId: string
}>

export const requestMFA = (axios: Axios) => (): Promise<RequestMFAResponse> => {
    return axios.post('/api/mfa/activate/begin')
}