import { FC } from 'react'

import { Collapse, IconButton, InputBase, InputBaseProps, Paper, styled } from '@mui/material'
import { Cancel, Search } from '@mui/icons-material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import useMobileQuery from '../hooks/useMobileQuery'

export const SearchInputContainer = styled('div')(() => ({
    position: 'sticky',
    margin: '15px',
    top: '15px',
    zIndex: 999,
}))

interface SearchInputProps {
    value: string
    onChange: InputBaseProps['onChange']
    onClear: () => void
    inputAdornment?: JSX.Element
    sticky?: boolean
    filters?: boolean
    filterOpen?: boolean
    onFilterOpenChange?: (open?: boolean) => void
}
export const SearchInput: FC<SearchInputProps> = ({
    value,
    onChange,
    onClear,

    inputAdornment,
    sticky,
    filters,
    filterOpen,
    onFilterOpenChange,
}) => {
    return (
        <SearchInputContainer>
            <>
                <div style={{ display: 'flex' }}>
                    <Paper elevation={1} style={{ display: 'flex', flexGrow: 1, }}>
                        <IconButton disableFocusRipple disableTouchRipple size="large">
                            <Search htmlColor={`var(--font-color)`} />
                        </IconButton>
                        <InputBase
                            value={value}
                            onChange={onChange}
                            placeholder="Search"
                            sx={{ flexGrow: 1, }}
                            />
                        {value && <IconButton disableFocusRipple disableTouchRipple onClick={onClear} size="large">
                            <Cancel />
                        </IconButton>}
                        { filters && (
                            <IconButton disableFocusRipple disableTouchRipple onClick={() => onFilterOpenChange(!filterOpen)}>
                                { filterOpen ? <ExpandLessIcon />  : <ExpandMoreIcon /> }
                            </IconButton>
                        ) }
                    </Paper>

                    { inputAdornment }
                </div>
                { filters && (
                    <Collapse in={filterOpen} timeout="auto" unmountOnExit>
                        <Paper elevation={1}>
                            <span>Hi</span>
                        </Paper>
                    </Collapse>
                ) }
            </>
        </SearchInputContainer>
    )
}

export default SearchInput
