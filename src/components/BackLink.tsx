import { FC } from "react"
import { Link } from "react-router-dom"
import { Link as MuiLink } from '@mui/material'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface BackLinkProps {
    link: string
    text: string
}

export const BackLink: FC<BackLinkProps> = ({
    link,
    text,
}) => {
    return (
        <Link to={link} style={{ display: 'flex', alignItems: 'center', margin: '15px' }}>
            <ArrowBackIosIcon />
            <MuiLink>{text}</MuiLink>
        </Link>
    )
}

export default BackLink
