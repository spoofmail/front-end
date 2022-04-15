import { Dashboard, Devices, Group, Settings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, styled } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SettingsIcon from '@mui/icons-material/Settings';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useMobileQuery from "../hooks/useMobileQuery";
import Header from "./Nav";
import { useTheme } from "@emotion/react";

const RootLayoutContainer = styled("div")(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'var(--background-color)',
}));

const OutletContainer = styled('div')(() => ({
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'var(--background-color)',
    overflow: 'auto',
}))

const drawerWidth = 150;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '55px',
    backgroundColor: '#f8f7f9',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }));

export default () => {
    const isMobile = useMobileQuery(598)
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <RootLayoutContainer>
            <Header />

            <OutletContainer>
                <Outlet />
            </OutletContainer>

            { isMobile && (
                <BottomNavigation
                showLabels
                value={location.pathname}
                onChange={(event: any, newValue: string) => {
                    console.log(newValue)
                    if (newValue !== location.pathname)
                        navigate(newValue)
                }}
            >
                <BottomNavigationAction value="/emails" label="Emails" icon={<MailIcon />} />
                <BottomNavigationAction value="/addresses" label="Addresses" icon={<AlternateEmailIcon />} />
                <BottomNavigationAction value="/settings" label="Settings" icon={<SettingsIcon />} />
            </BottomNavigation>
            ) }
        </RootLayoutContainer>
    )
}