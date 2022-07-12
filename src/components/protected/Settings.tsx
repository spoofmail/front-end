import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, styled, TextField } from "@mui/material"
import { useNavigate } from "react-router"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaletteIcon from '@mui/icons-material/Palette';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

import { SpoofmailAPI } from "../../App"
import MFA from "./SettingsPages/MFA"
import { useAppSelector } from "../../hooks/useRedux";

const SettingsContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingBottom: '15px',
}))

const RouteContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
}))

const RouteItem = styled(Paper)(() => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    cursor: 'pointer',
    margin: '15px',
    backgroundColor: 'var(--primary-color)',
    alignSelf: 'normal',
}))

const routes = [
    { label: 'Account', path: '/settings/account', icon: <PersonIcon /> },
    { label: '2-Factor Auth', path: '/settings/mfa', icon: <LockOpenIcon /> },
    { label: 'Theme', path: '/settings/theme', icon: <PaletteIcon /> },
]

interface SettingsProps {

}
export const Settings = () => {
    const navigate = useNavigate()

    const mfa = useAppSelector(({ user }) => user.hasMFA)

    const [signOutDialogOpen, setSignOutDialogOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        navigate('/login', { replace: true })
    }

    return (
        <SettingsContainer>
            <RouteContainer>
                {routes.map(route => (
                    <RouteItem key={route.path} onClick={() => navigate(route.path)} elevation={8} variant="elevation">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {route.path === '/settings/mfa' ? (
                                mfa ? <LockIcon sx={{ color: 'green' }} /> : <LockOpenIcon sx={{ color: 'red' }} />
                            ) : route.icon}

                            {route.path === '/settings/mfa' ? (
                                <span style={{ color: 'var(--font-color)', marginLeft: '15px' }}>{route.label} <span style={{ color: mfa ? 'green' : 'red'}}>{mfa ? '(Active)' : '(Inactive)'}</span></span>
                            ) : (
                                <span style={{ color: 'var(--font-color)', marginLeft: '15px' }}>{route.label}</span>
                            )}
                        </div>

                        <ChevronRightIcon />
                    </RouteItem>
                ))}
            </RouteContainer>

            <Button color="error" variant="outlined" onClick={() => setSignOutDialogOpen(true)} sx={{ margin: '0 15px', marginBottom: '15px' }}>Sign Out</Button>
            <Dialog open={signOutDialogOpen} onClose={() => setSignOutDialogOpen(false)}>
                <DialogTitle>Confirm Sign out</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to sign out?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={() => setSignOutDialogOpen(false)}>Cancel</Button>
                    <Button color="primary" variant="contained" onClick={handleLogout}>Sign Out</Button>
                </DialogActions>
            </Dialog>
        </SettingsContainer>
    )
}

export default Settings
