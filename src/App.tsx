import { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Navigate, Routes, useLocation } from "react-router-dom";

import Login from './components/Login';
import Layout from './components/Layout';

import { store } from './redux/store';
import CreateSpoofmailAPI from './api/spoofmail'
import Emails from './components/protected/Emails';
import createCustomTheme from './util/createCustomTheme';
import NotFound404 from './components/protected/404'
import Addresses from './components/protected/Addresses';
import Settings from './components/protected/Settings';
import MFA, { MFAActivateForm } from './components/protected/SettingsPages/MFA';

function getAuthToken() {
    return localStorage.getItem('user_token')
}

function clearAuthToken() {
    localStorage.removeItem('user_token')
}

export const SpoofmailAPI = CreateSpoofmailAPI({
    environment: 'development',
    getAuthToken,
    clearAuthToken,
})

const isAuthed = () => {
    let token = localStorage.getItem('user_token');
    return token && token.length > 10;
};

function App() {
    const theme = useMemo(() => createCustomTheme(), [])

    const [authed, setAuthed] = useState(false)

    /*useEffect(() => {
        SpoofmailAPI.getSession()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])*/

    return (
        // @ts-ignore
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login beLogin={true} />} />
                        <Route path="/register" element={<Login beLogin={false} />} />
                        <Route path="/signup" element={<Login beLogin={false} />} />
                        <Route element={<Layout />}>
                            <Route index element={<Protected component={<Emails />} />} />
                            <Route path="/" element={<Protected component={<Emails />} />} />
                            <Route path="/emails" element={<Protected component={<Emails />} />} />
                            <Route path="/addresses" element={<Protected component={<Addresses />} />} />
                            <Route path='/settings'>
                                <Route index element={<Protected component={<Settings />} />} />
                                <Route path="/settings/mfa" element={<Protected component={<MFA />} />} />
                                <Route path="/settings/mfa/activate" element={<Protected component={<MFAActivateForm />} />} />
                            </Route>
                            <Route path="*" element={<Protected component={<NotFound404 />} />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

interface ProtectedProps {
    component: JSX.Element
}
const Protected = ({ component }: ProtectedProps) => {
    const isAuthenticated = isAuthed()
    const location = useLocation()

    if (!true) {
        return <></> // <PageLoadingContainer><CircularProgress size={34} /></PageLoadingContainer>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return component
};

export default App;
