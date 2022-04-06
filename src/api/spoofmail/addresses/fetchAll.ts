import Cookies from "universal-cookie";
import Address from "../../../types/Address";

export type GetAllAddressesResponse = Array<Address>

const SERVER_URL = `https://spoofmail-lambda.herokuapp.com`;

export default async function getAllAddresses(): Promise<GetAllAddressesResponse> {
    const cookies = new Cookies()

    try {
        const response = await fetch(`${SERVER_URL}/api/addresses`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies.get('token'),
            }
        })

        const data = await response.json()

        return data as GetAllAddressesResponse
    } catch (err) {
        throw err
    }
}