import { createTheme } from "@mui/material/styles"

export const createCustomTheme = () => {
    const theme = createTheme({
        components: {
            MuiBottomNavigation: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'var(--primary-color)',
                    },
                },
            },
            MuiBottomNavigationAction: {
                styleOverrides: {
                    root: {
                        "&.Mui-selected": {
                            color: '#1976d2',
                        },
                        color: 'var(--font-color)',
                    },
                    label: {
                        color: 'var(--font-color)',
                        "&.Mui-selected": {
                            color: '#1976d2',
                        },
                    },
                },
            },
        },
    })

    return theme
}

export default createCustomTheme