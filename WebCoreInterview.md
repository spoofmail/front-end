• Responsive design and media queries

    fixed - desktop only, hardcoded pixels ie width: 800px;
    fluid - mobile and tablet, percentage based units, designed to shrink proportionally ie width: 98%;
    adaptive - Split with media queries to change at specific breakpoints ie @media(max-width: 500px){width: 500px;}
    responsive - Responsive units are used along with media queries to accomodate more devices ie @media(max-width: 500px){width 1.25%}

• Accessibility importance

    use SEMANTIC HTML for SEO and to aid those with dissabilities. 
        examples:
            not using fixed size values (use relative length units like ems, rems, or % based)
            Semantic tags typically have english meaning, like <header>, <main>, <nav>, <button> and <article>. Non-semantic tags are those without any english meaning, like <div> and <span>.

• Higher order functions and callbacks

    callback functions are just functions that are passed into other functions as arguments
    items.forEach(item =>  alert(item) ); (item => alert(item)) = the inner function foreach is calling back to

    
• React app API calls

    https://learn.lambdaschool.com/web3/module/recupVjaAKPqbuk7Y/

    CRUD with fetch, axios, requests, etc

    promises

    .then()
    .catch()


    https://github.com/axios/axios


• React app route managements

    
    React Router is declarative style routing for React applications
    Routes are a way of getting to a destination. A route can specify which components to render on the page, and in what order, as we’ve seen before.
    After we’ve wrapped our Root component in the Router or BrowserRouter component. declare what components will be mounted when certain URL paths are met
    import { Route } from 'react-router-dom';
    <Route path="/users" component={Users} /> - opens Users component when url path="/users"


    <Route path='/:handle' component={Profile} /> - Dynamic Routes
    const params = useParams();
    const heros = hero.find(item => item.id === Number(params.hero));

    const { path, url } = useRouteMatch();
    <NavLink to={`${url}/movies`}>Movie List</NavLink>
     <Route path={`${path}/movies`}>
          <Movies movielist={heros} />

    import { Link } from 'react-router-dom'
    <Link to="/about">About</Link>
    <Link to={`/avengers/${avenger.id}`}>

    useHistory --
         import { useHistory } from 'react-router-dom'

        function BackButton({ children }) {
        let history = useHistory()
        return (
            <button type="button" onClick={() => history.goBack()}>
            {children}
            </button>
        )
        }
  
• Use forms to build interactive Component Behavior.

    The humble <form> tag 
        -Signup, login, search, create, edit, dropdowns, checkboxes, radio buttons, regular buttons and more

    import React, { useState } from "react";


    import "./App.css";

    function App() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(name);
        console.log(password);
    };

    return (
        <div className="App">
        {console.log({ name })}
        {console.log({ password })}
        <form onSubmit={event => handleSubmit(event)}>
            <label>
            Username:
            <input type="text" onChange={event => handleNameChange(event)} />
            </label>
            <label>
            Password:
            <input type="text" onChange={event => handlePasswordChange(event)} />
            </label>
            <button>Submit!</button>
        </form>
        </div>
    );
    }

• Use Redux thunks to make stateful API requests with an appropriate spinner UI.

    In our app, as we log in, in Login.js we set requesting = true as the call is made, and if its requested, the "spinner" says "checking", untill success or failure


    By nature Redux is synchronous. Because of this we need to apply some middleware to extend the functionality of our Redux package to allow for things like, promises (which are asynchronous)

    For our purposes, a State Machine has:

    initial state (store).
    current state (store).
    inputs or actions (action creators) that trigger transitions (reducers) to the next state.
    It helps to think in terms of states instead of transitions.

    Middleware intercepts some process, runs a function at the intercept point, then (usually) continues the process. Or, sometimes middleware stops the process entirely.

    Middleware intercepts every action before it flows through to the Reducers.

    Since the Redux action -> reducer flow is synchronous, we will use Redux Thunk to make the flow asynchronous and make API calls from our action creators.

    thunk is another word for a function. But it’s not just any old function. It’s a special (and uncommon) name for a function that’s returned by another function. Like this:

        Copy
        function not_a_thunk() {
        // this one is a "thunk" because it defers work for later:
        return function() {
            console.log('do stuff now');
        };
        }

    This is where redux-thunk becomes very powerful. The action-creator returned thunk has access to the dispatch function. So we can run an async function, like an API call, and inside the .then() we can dispatch an action!



• Use RESTful HTTP methods PUT & DELETE to modify data on a server.

    REpresentational State Transfer
    When we call .put or .delete, we’re instructing the server to remove or edit some information somewhere

    In simplest words, in the REST architectural style, data and functionality are considered resources and are accessed using Uniform Resource Identifiers (URIs). The resources are acted upon by using a set of simple, well-defined operations. The clients and servers exchange representations of resources by using a standardized interface and protocol – typically HTTP.

• Implement a client-side Login with tokens and protected routes in React

     The server running these services can issue a JWT (JSON Web Token) as the authentication token, in exchange for correct login credentials.

    After the user properly authenticates (properly logs in), the server returns the token. Your application needs to save the returned token (the permissions) to localStorage, so that the above axiosWithAuth module can grab it for other calls that require the Authorization header.

    Copy
    const login = () => {
    axios.post('endpoint/here', userCredentials)
        .then(res => {
        localStorage.setItem('token', res.data.token);
        props.history.push('/dashboard');
        }
    }
    Now that we have the token, we can do an AJAX request to an endpoint using the axiosWithAuth.js module.

    Copy
    import { axiosWithAuth } from '../../path/to/axiosAuth.js';
    // etc
    axiosWithAuth().get('endpoint/path/here').then(data => /* do something with the data */);
    

    We are passing in all of the props passed to <PrivateRoute /> in the App component.

    Copy
    // Requirement 3.
    // It checks if the user is authenticated, if they are,
    // it renders the "component" prop. If not, it redirects
    // the user to /login.

    const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        localStorage.getItem("token") ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
        }
    />
    );

    Also, notice the <Redirect /> component? That is from React Router. It does exactly what you think - redirects the app to the supplied route.

    Let’s think about the login page now. Our login page is going to be a form that takes in a user’s credentials, calls the login endpoint with a POST request, and then redirects the user to the protected route when the login API call returns. Let’s set it up and practice our authentication skills!

    Copy
    import React, { useState } from 'react';
    import { axiosWithAuth } from '../path/to/module';

    const Login = (props) => {
    const [credentials, setCredentials] = useState({});

    const login = e => {
        e.preventDefault();
        axiosWithAuth().post('login/endpoint', credentials)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/');
        })
    }

    const handleChange = e => {
        setCredentials: {
            ...credentials,
            [e.target.name]: e.target.value,
        }
    }

        return (
        <div>
            <form onSubmit={this.login}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={this.handleChange}
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={this.handleChange}
            />
            <button>Log in</button>
            </form>
        </div>
        )
    }

    export default Login;

• Use Express’ built-in router to build and test  a modular server API with Postman.

    

• Implement authentication & custom middleware
• Use SQL to create and query a local database, table schemas, configure scripted schema migrations & seed scripts