import { useState } from "react"
import { ClickAwayListener, Paper, styled, Tooltip } from "@mui/material"
import { useAppSelector } from "../../hooks/useRedux"

import Address from "../../types/Address"

import "../../CSS/github.css"
import { Check } from "@mui/icons-material"
import ClipboardCopy from "../ClipboardCopy"

const AddressRootContainer = styled(Paper)(() => ({
    backgroundColor: 'var(--primary-color)',
    padding: '15px',
    display: 'flex',
    margin: '10px 0 0 0',
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

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
        navigator.clipboard.writeText(addressname);
    };

    return (
        <AddressRootContainer elevation={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <ClipboardCopy text={addresstag || addressname} valueToCopy={addressname} />
        </AddressRootContainer>
    )
}

export default AddressItem
