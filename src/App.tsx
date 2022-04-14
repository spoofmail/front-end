import { useEffect, useMemo, useState } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
import { store } from './redux/store';

import './CSS/App.css';
import Login from './components/Login';
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';

import CreateSpoofmailAPI from './api/spoofmail'

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

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            isAuthed()
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            }
        />
    )
}

function App() {
    const theme = useMemo(() => createTheme(), [])

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
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <ProtectedRoute component={ProtectedRoutes} />
                    </Switch>
                </Router>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
