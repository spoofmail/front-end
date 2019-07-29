import React from "react";
import { Link } from "react-router-dom"

export default props => {
    return (
        <>
            <h1>404 Page not found</h1>
            <Link to="/dashboard">Back to dashboard</Link>
        </>
    );
}