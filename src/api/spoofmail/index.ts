import axios from 'axios';
import { createAddress } from './addresses/create';
import { deleteAddress } from './addresses/delete';
import { getAllAddresses } from './addresses/getAll';
import { updateAddressTag } from './addresses/updateTag';
import { login } from './auth/login';
import { register } from './auth/register';
import { getSession } from './auth/session';
import { deleteEmail } from './emails/deleteEmail';
import { getAllEmails } from './emails/getAll';

interface SpoofmailAPIOptions {
    environment: 'development' | 'production'
    getAuthToken: () => string
    clearAuthToken?: () => void
    url?: string
}
export default ({
    environment = 'production',
    url = environment === 'development' ? 'http://localhost:8080' : 'https://spoofmail-lambda.herokuapp.com',
    getAuthToken,
    clearAuthToken,
}: SpoofmailAPIOptions) => {
    const instance = axios.create({
        baseURL: url,
    })

    instance.interceptors.request.use(
        function(config) {
            config.headers['Authorization'] = getAuthToken()

            return config
        }
    )

    instance.interceptors.response.use(
        function(response) {
            return response
        },
        function(error) {
            console.error({error})
            if (error.response.status === 401) {
                if (typeof clearAuthToken === 'function') {
                    //clearAuthToken()
                }
                //window.location.href = '/'
            }

            return error
        }
    )

    return {
        getAllAddresses: getAllAddresses(instance),
        createAddress: createAddress(instance),
        updateAddressTag: updateAddressTag(instance),
        deleteAddress: deleteAddress(instance),

        getSession: getSession(instance),
        login: login(instance),
        register: register(instance),

        getAllEmails: getAllEmails(instance),
        deleteEmail: deleteEmail(instance),
    }
}