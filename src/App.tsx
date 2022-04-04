import React, { useMemo } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";

import './CSS/App.css';
import Login from './components/Login';
import ProtectedRoutes from "./components/ProtectedRoutes";
import Cookies from "universal-cookie";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
let cookies = new Cookies();

// @ts-ignore
window.serverURL = `https://spoofmail-lambda.herokuapp.com`;

const isAuthed = () => {
    let token = cookies.get("token");
    return token && token.length > 10;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
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

function App() {
    const theme = useMemo(() => createTheme(), [])
    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <ProtectedRoute component={ProtectedRoutes} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
