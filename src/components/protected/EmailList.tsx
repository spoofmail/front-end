import { FC, useEffect } from "react"
import { Button, CircularProgress, IconButton, styled } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'

import EmailItem from "./EmailItem"

import Email from "../../types/Email"

const EmailsContainer = styled('div')(() => ({

}))

const PaginationControlsContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'bottom'
})(({ bottom }: { bottom?: boolean }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px',
    marginBottom: bottom ? '75px' : undefined,
}))

interface EmailsProps {
    emails: Email[]
    currentPage: number
    totalResults: number
    perPage: number
    onPageChange: (newPage: number) => void
    onSelect: (id: Email['id']) => void
    selected: (id: Email['id']) => boolean
    editMode?: boolean
    setEditMode?: (editMode: boolean) => void
    loading?: boolean
}
export const Emails: FC<EmailsProps> = ({
    emails,
    currentPage,
    totalResults,
    perPage,
    onPageChange,
    onSelect,
    selected,

    editMode,
    setEditMode,
    loading,
}) => {
    useEffect(() => {
        onPageChange(1)
    }, [])

    const totalResultsLabel = Math.min((currentPage - 1) * perPage + perPage, totalResults)

    return (
        <EmailsContainer>
            <PaginationControls 
                currentPage={currentPage}
                perPage={perPage}
                totalResults={totalResults}
                totalResultsLabel={totalResultsLabel}
                onPageChange={onPageChange}
            />
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', height: '100px', alignItems: 'center' }}>
                    <CircularProgress size={34} />
                </div>
            ): (
                emails.map(email => <EmailItem  {...email} key={email.id} checked={selected(email.id)} onSelect={onSelect} editMode={editMode} setEditMode={setEditMode} />)
            ) }
            <PaginationControls 
                currentPage={currentPage}
                perPage={perPage}
                totalResults={totalResults}
                totalResultsLabel={totalResultsLabel}
                onPageChange={onPageChange}
                bottom
            />
        </EmailsContainer>
    )
}

interface PaginationControlsProps {
    currentPage: number
    perPage: number
    totalResults: number
    totalResultsLabel: number
    onPageChange: (value: number) => void
    bottom?: boolean
}
const PaginationControls: FC<PaginationControlsProps> = ({
    currentPage,
    perPage,
    totalResults,
    totalResultsLabel,
    onPageChange,

    bottom,
}) => {
    const previousDisabled = currentPage <= 1
    const nextDisabled = currentPage > totalResults / perPage
    const firstDisabled = currentPage === 1
    const lastDisabled = currentPage > totalResults / perPage

    return (
        <PaginationControlsContainer bottom={bottom}>
            <span style={{ color: 'var(--font-color)' }}>{(currentPage - 1) * perPage}-{totalResultsLabel} of {totalResults}</span>
            <div>
                <IconButton disabled={firstDisabled} onClick={() => onPageChange(1)}>
                    <FirstPageIcon sx={{ opacity: firstDisabled ? '0.5' : '1.0' }} />
                </IconButton>
                <IconButton 
                    disabled={previousDisabled} 
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeftIcon sx={{ opacity: previousDisabled ? '0.5' : '1.0' }} />
                </IconButton>
                <IconButton 
                    disabled={nextDisabled} 
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRightIcon sx={{ opacity: nextDisabled ? '0.5' : '1.0' }} />
                </IconButton>
                <IconButton disabled={lastDisabled} onClick={() => onPageChange(Math.floor(totalResults / perPage) + 1)}>
                    <LastPageIcon sx={{ opacity: lastDisabled ? '0.5' : '1.0' }} />
                </IconButton>
            </div>
        </PaginationControlsContainer>
    )
}

export default Emails
