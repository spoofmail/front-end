import { styled } from "@mui/material"
import { useAppSelector } from "../../hooks/useRedux"

import Address from "../../types/Address"

import "../../CSS/github.css"

const AddressRootContainer = styled('div')(() => ({
    backgroundColor: 'var(--primary-color)',
    padding: '15px',
    display: 'flex',
    margin: '10px 0',
    color: 'var(--font-color)',
}))

interface AddressItemProps {
    id: Address['id']

}
export const AddressItem = ({
    id
}: AddressItemProps) => {
    const {
        addressname,
        addresstag,
    } = useAppSelector(({ address }) => address.map[id])

    return (
        <AddressRootContainer>
            <div className="BtnGroup">
                <h3 className="address text-mono f6 btn btn-outline BtnGroup-item">
                    {addressname}
                </h3>
                { /* @ts-ignore */ }
                <clipboard-copy value="02d6c266d93c4ff92ca5a8aa2d7b922e067c43de" aria-label="Copy the full SHA" className="btn btn-outline BtnGroup-item" tabindex="0" role="button" onClick={() => {}}>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" className="octicon octicon-clippy">
                        <path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>
                    </svg>
                { /* @ts-ignore */ }
                </clipboard-copy>

            </div>
            <span>{addresstag}</span>
        </AddressRootContainer>
    )
}

export default AddressItem
