import { FC } from "react"
import { styled } from "@mui/material"
import Email from "../../types/Email"

const EmailRootContainer = styled('div')(() => ({
    backgroundColor: 'var(--primary-color)',
    padding: '15px',
    display: 'flex',
    margin: '10px 0',
    color: 'var(--font-color)',
}))

interface EmailProps extends Email {
    
}
export const EmailItem: FC<EmailProps> = ({
    id,
    from,
    html,
    text,
}) => {


    return (
        <EmailRootContainer>
            <span style={{ marginRight: 10 }}>{from}</span>
            <span>{text}</span>
        </EmailRootContainer>
    )
}

export default EmailItem
