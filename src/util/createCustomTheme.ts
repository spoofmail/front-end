import { createTheme } from "@mui/material/styles"

export const createCustomTheme = () => {
    const defaultTheme = createTheme()

    const theme = createTheme(defaultTheme, {
        components: {
            MuiPaper: {
                styleOverrides: {
                    elevation: {
                        backgroundColor: 'var(--primary-color)',
                        color: 'black'
                    }
                }
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        color: 'var(--font-color)',
                    },
                    colorError: {
                        color: defaultTheme.palette.error.main
                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: 'var(--font-color)',
                    }
                }
            },
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
                            '& svg': {
                                color: '#1976d2',
                            }
                        },
                        color: 'var(--font-color)',
                    },
                    label: {
                        color: 'var(--font-color)',
                        "&.Mui-selected": {
                            color: '#1976d2',
                        },
                    },
                    iconOnly: {
                        color: 'var(--font-color)',
                        "&.Mui-selected": {
                            color: '#1976d2',
                        },
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        backgroundColor: 'var(--background-color)'
                    },
                },
            },
            MuiDialogContentText: {
                styleOverrides: {
                    root: {
                        color: 'var(--font-color)'
                    }
                }
            }
        },
    })

    return theme
}

export default createCustomTheme