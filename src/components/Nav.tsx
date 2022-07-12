import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Brightness6Icon from '@mui/icons-material/Brightness6';
import LogoutIcon from '@mui/icons-material/Logout';

import useDarkMode from "../hooks/useDarkMode"

import "../CSS/Nav.css"

import RefreshToggle from "./RefreshToggle";
import { useAppSelector } from "../hooks/useRedux";
import useMobileQuery from "../hooks/useMobileQuery";

let themeData = {
    "true": {
        "--primary-color": "#2a2a2e",
        "--background-color": "#38383d",
        "--background-color-trans": "#38383dcc",
        "--button-color": "#3f51b5",
        "--button-hover-color": "#303f9f",
        "--input-color": "white",
        "--font-color": "white",
        "--font-color2": "black",
    },
    "false": {
        "--primary-color": "white",
        "--background-color": "#eee",
        "--background-color-trans": "#eeeeeec2",
        "--button-color": "#3f51b5",
        "--button-hover-color": "#303f9f",
        "--input-color": "black",
        "--font-color": "black",
        "--font-color2": "white",
    }
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default props => {
    const isMobile = useMobileQuery(598)
    const [darkMode, setDarkMode] = useDarkMode();
    const navigate = useNavigate()
    const username = useAppSelector(({ user }) => user.username) || 'vc'

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    useEffect(() => {
        Object.keys(themeData[darkMode + ""]).forEach(key => {
            document.documentElement.style.setProperty(key, themeData[darkMode + ""][key]);
        })
    }, [darkMode])

    const handleLogOut = _ => {
        localStorage.removeItem("user_token");
        navigate('/login', { replace: true })
    }

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <div className="navigation">
            {props.isLogin ? (
                <Link to="/">Home</Link>
            ) : (
                <Link to="/dashboard" style={{ visibility: "hidden" }}></Link>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
                { props.isLogin && <Brightness6Icon htmlColor={"var(--font-color)"} onClick={handleDarkMode} sx={{ marginRight: '10px', cursor: 'pointer' }} /> }
                { !isMobile && <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar {...stringAvatar(username + ' v')} />
                    </IconButton>
                </Tooltip> }
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >

                    <MenuItem onClick={handleDarkMode}>
                        <ListItemIcon>
                            <Brightness6Icon fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">Toggle theme</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}