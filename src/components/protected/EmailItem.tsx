import { FC, useState, useRef, useEffect } from "react"
import { Checkbox, styled } from "@mui/material"
import Email from "../../types/Email"
import useMobileQuery from "../../hooks/useMobileQuery"

const EmailRootContainer = styled('div')(() => ({
    backgroundColor: 'var(--primary-color)',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    color: 'var(--font-color)',
}))

interface EmailProps extends Email {
    checked: boolean
    onSelect: (id: Email['id']) => void

    editMode?: boolean
    setEditMode?: (editMode: boolean) => void
}
export const EmailItem: FC<EmailProps> = ({
    id,
    from,
    html,
    text,
    checked,
    onSelect,

    editMode,
    setEditMode,
}) => {
    const timerRef = useRef(null)
    const [touched, setTouched] = useState(false)

    const isMobile = useMobileQuery(598)

    const handleTouchStart = (e) => {
        console.log('start', e)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setEditMode(true)
        }, 1500)
    }

    const handleTouchEnd = (e) => {
        console.log('end', e)
        clearTimeout(timerRef.current)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleTouchEnd);

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('scroll', handleTouchEnd)
        }
    }, [])

    return (

        <EmailRootContainer onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onDrag={handleTouchEnd}>
            { editMode && (
                <Checkbox
                    checked={checked}
                    onChange={e => onSelect(id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            ) }
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <span style={{ marginRight: 10, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: '15px' }}>{from}</span>
                <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{text}</span>
            </div>
        </EmailRootContainer>
    )
}

export default EmailItem
