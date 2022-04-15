import { FC, useEffect } from "react"
import { Button, styled } from "@mui/material"

import EmailItem from "./EmailItem"

import Email from "../../types/Email"

const EmailsContainer = styled('div')(() => ({

}))

interface EmailsProps {
    emails: Email[]
    currentPage: number
    totalResults: number
    perPage: number
    onPageChange: (newPage: number) => void
    onSelect: (id: Email['id']) => void
}
export const Emails: FC<EmailsProps> = ({
    emails,
    currentPage,
    totalResults,
    perPage,
    onPageChange,
    onSelect,
}) => {
    useEffect(() => {
        onPageChange(1)
    }, [])

    const totalResultsLabel = Math.min((currentPage - 1) * perPage + perPage, totalResults)

    console.log(emails)

    return (
        <EmailsContainer>
            <div className="pagination-controls">
                <span style={{ color: 'var(--font-color)' }}>{(currentPage - 1) * perPage}-{totalResultsLabel} of {totalResults}</span>
                { currentPage > 1 && <Button variant="contained" onClick={() => onPageChange(currentPage - 1)}>Last</Button> }
                { currentPage <= totalResults / perPage && <Button variant="contained" onClick={() => onPageChange(currentPage + 1)}>Next</Button> }
            </div>
            { emails.map(email => <EmailItem key={email.id} {...email} />) }
            <div className="pagination-controls">
                <span style={{ color: 'var(--font-color)' }}>{(currentPage - 1) * perPage}-{totalResultsLabel} of {totalResults}</span>
                { currentPage > 1 && <Button variant="contained" onClick={() => onPageChange(currentPage - 1)}>Last</Button> }
                { currentPage <= totalResults / perPage && <Button variant="contained" onClick={() => onPageChange(currentPage + 1)}>Next</Button> }
            </div>
        </EmailsContainer>
    )
}

export default Emails
