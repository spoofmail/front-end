import { FC } from "react"
import { styled } from "@mui/material"
import Email from "../../../types/Email"

const EmailRootContainer = styled('div')(() => ({

}))

interface EmailProps extends Email {
    onRead?: (id: Email['id']) => void
    onDelete: (id: Email['id']) => void
}
export const Email: FC<EmailProps> = ({
    id,
    from,
    html,

}) => {


    return (
        <EmailRootContainer>

        </EmailRootContainer>
    )
}

export default Email
