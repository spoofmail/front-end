import React from "react";

import Nav from "./Nav";
import Dashboard from "./protected/Dashboard"
import NotFound from "./protected/404";

import { Router, Switch, Route } from "react-router-dom"
import history from "../history";

export default props => {
    return (
        <Router history={history}>
            <Nav />
            <Switch>
                <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
                <Route render={props => <NotFound {...props} />} />
            </Switch>
        </Router>
    );
}