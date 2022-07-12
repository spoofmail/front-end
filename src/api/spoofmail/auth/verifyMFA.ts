import { Axios, AxiosResponse } from "axios";

export type VerifyMFAResponse = AxiosResponse<{
    status: 'success' | 'error'
    message: string
}>

export const verifyMFA = (axios: Axios) => (body: { mfaRequestId: string, token: string }): Promise<VerifyMFAResponse> => {
    return axios.post('/api/mfa/activate/verify', body)
}