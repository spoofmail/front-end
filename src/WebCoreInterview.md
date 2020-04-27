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

    A closure is an inner function that has access to the outer (enclosing) function’s variables — scope chain. The closure has three scope chains: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function’s variables, and it has access to the global variables.

    
    Callbacks are also closures as the passed function is executed inside other function just as if the callback were defined in the containing function. Closures have access to the containing function’s scope, so the callback function can access the containing functions’ variables, and even the variables from the global scope.


• React app API calls


    async/await in JavaScript is nothing more than syntactic sugar over Promises.

    The keyword await makes JavaScript wait until that promise settles and returns its result.


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

    REST APIs have six constraints:

    client-server architecture.
    stateless architecture: each request should stand on its own, and order should not matter. No shared state.
    cacheable: improves network performance.
    GET, PUT, and DELETE should be idempotent (the same command executed multiple times, the state of resources on the server is exactly the same, much like pure functions)
    POST is not idempotent.
    Caching is a way to store and retrieve data so that future requests can be fulfilled faster without repeating expensive calculations or operations.
    layered system: component A (a client) might or might not communicate directly with component B (the server). There may be other layers between them like logging, caching, DNS servers, load balancers, and authentication.
    code on demand
    The API returns the resource and code to act on it.
    The client only needs to know how to execute the code.
    Makes the API more flexible, upgradable and extendible.
    Most web application, send JavaScript code along with the data.
    uniform interfaces
    Each resource should be accesible through a single url. Not a hard requirement, but recommended.
    We should be able to manage the resources through these representations (the URL).
    every interaction with the resource should happen through the URL identifier we gave to it.
    Self-descriptive messages.
    HATEOAS (Hyepermedia As The Engine Of Application State). Much like a choose your own adventure book, the pages are not read in order. You start at page 1, and based on the information available, the reader (client) chooses the action to take, moving them to a different page. A good example of a hypermedia API is the GitHub API.

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


    https://expressjs.com/en/4x/api.html#router

    Using routing we can map incoming requests to the appropriate request handler based on the URL and HTTP Method used.

    Express Routers are a way to split an application into sub-applications to make it more modular and easier to maintain and reason about.

    An Express Router behaves like a mini Express application. It can have it’s own Routing and Middleware, but it needs to exist inside of an Express application. 

    Also, note that it is possible to have a central router that represents our API and have that router import the routes. This logic cleans up our main server file even more. Let’s see a quick example of that.

        Copy
        const express = require('express');

        const apiRoutes = require('./api/apiRoutes');

        const server = express();

        server.use('/api', userRoutes);

        server.listen(8000, () => console.log('API running on port 8000'));
        And the apiRoutes could look like this:

        Copy
        // inside /api/apiRoutes.js <- this can be place anywhere and called anything
        const express = require('express');

        // if the other routers are not nested inside /api then the paths would change
        const userRoutes = require('./users/userRoutes');
        const productRoutes = require('./products/productRoutes');
        const clientRoutes = require('./clients/clientRoutes');

        const router = express.Router(); // notice the Uppercase R

        // this file will only be used when the route begins with "/api"
        // so we can remove that from the URLs, so "/api/users" becomes simply "/users"
        router.use('/users', userRoutes);
        router.use('/products', productRoutes);
        router.use('/clients', clientRoutes);

        // .. and any other endpoint related to the user's resource

        // after the route has been fully configured, then we export it so it can be required where needed
        module.exports = router; // standard convention dictates that this is the last line on the file
        As you can see, routers can use other routers.

        The userRoutes, productRoutes and clientRoutes remain unchanged (other than relocating them inside the API folder).

    // this request handler executes when making a DELETE request to /hobbits
    server.delete('/hobbits', (req, res) => {
    res.status(204);
    });
    
    server.put('/hobbits/:id', (req, res) => {
    const hobbit = hobbits.find(h => h.id == req.params.id);

    if (!hobbit) {
        res.status(404).json({ message: 'Hobbit does not exist' });
    } else {
        // modify the existing hobbit
        Object.assign(hobbit, req.body);

        res.status(200).json(hobbit);
    }
    });

    First, we used require() to import the express module and make it available to our application. This is similar to the import keyword we have used before. The line const express = require('express'); is equivalent to import express from 'express';


    // require the express npm module, needs to be added to the project using "npm install express"
    const express = require('express');

    // creates an express application using the express module
    const server = express();

    The first two arguments passed by express to a route handler function are: 1) an object that represents the request and 2) an object that represents the response. Express expands those objects with a set of useful properties and methods. Our example uses the .send() method of the response object to specify the data sent to the client as the response body. You can call the first two arguments anything you want, but it is very common to see them called req and res, we at Lambda call them the homies as they always hang out together.

    // configures our server to execute a function for every GET request to "/"
    // the second argument passed to the .get() method is the "Route Handler Function"
    // the route handler function will run on every GET request to "/"
    server.get('/', (req, res) => {
    // express will pass the request and response objects to this function
    // the .send() on the response object can be used to send a response to the client
    res.send('Hello World');
    });

    // once the server is fully configured we can have it "listen" for connections on a particular "port"
    // the callback function passed as the second argument will run once when the server starts
    server.listen(8000, () => console.log('API running on port 8000'));


    Main Features of Express
        Middleware
            Middleware functions can get the request and response objects, operate on them, and (when specified) trigger some action. Examples are logging or security.

            Express’ middleware stack is basically an array of functions.

            Middleware CAN change the request or response but it doesn’t have to.

        Routing
            Routing is a way to select which request handler function is executed. It does so based on the URL visited and the HTTP method used. Routing provides a way to break an application into smaller parts.

        Routers for Application Modularity
            Applications can be broken up into routers. We could have a router to serve our SPA and another router for our API. Each router can have its own middleware and routing. This combination provides improved functionality.

        Convenience Helpers
            Express has many helpers that provide out of the box functionality to make writing web applications and API servers easier.

            A lot of those helpers are extension methods added to the request and response objects.

            Examples from the Api Reference include: response.redirect(), response.status(), response.send(), and request.ip.

        Views
            Views provide a way to dynamically render HTML on the server and even generate it using other languages.

• Implement authentication & custom middleware


    Authentication is the process by which our Web API verifies the identity of a client that is trying to access a resource. This is different from authorization, which comes after authentication and determines what type of access, if any, that a user should have.


    Instead of writing our own key derivation function (fancy name for hashing function), we’ll use a well known and popular module called bcryptjs. This module is well supported and stable, but there are other options you can explore.

    Bcryptjs features include:

    password hashing function.
    implements salting both manually and automatically.
    accumulative hashing rounds.
    Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.


    To hash a password:

    Copy
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    // move on to save the user.
    To verify a password:

    Copy
    const credentials = req.body;

    // find the user in the database by it's username then
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
    return res.status(401).json({ error: 'Incorrect credentials' });
    }

    // the user is valid, continue on

    function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
        )}`
    );

    next();
    }

    Using cookies to transfer session data.
        Advantages when using cookies:

        a cookie is a small key/value pair data structure that is passed back and forth between client and server and stored in the browser.
        the server uses it to store information about a particular client/user.
        workflow for using cookies as session storage:
        the server issues a cookie with an expiration time and sends it with the response.
        browsers automatically store the cookie and send it on every request to the same domain.
        the server can read the information contained in the cookie (like the username).
        the server can make changes to the cookie before sending it back on the response.
        rinse and repeat.


    
    Storing session data in Memory Cache (preferred way of storing sessions in production applications)
        stored as key-value pair data in a separate server.
        the server still uses a cookie, but it only contains the session id.
        the memory cache server uses that session id to find the session data.

    Let's add session support to our Web API:
        const session = require('express-session');

        // configure express-session middleware
        server.use(
        session({
            name: 'notsession', // default is connect.sid
            secret: 'nobody tosses a dwarf!',
            cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: true, // only set cookies over https. Server will not send back a cookie over http.
            }, // 1 day in milliseconds
            httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
            resave: false,
            saveUninitialized: false,
        })
        );


    Learn to restrict access to resources, allowing access only for authenticated users
    Most Web APIs will have endpoints that can only be accessed by authenticated clients.

    In this section we’ll see how we can use Express local middleware to implement this functionality.

    Overview
    Restricting access to endpoints is a two-step process:

    We write middleware to check that there is a session for the client.
    We place that middleware in front of the endpoints we want to restrict.
    Follow Along
    We’ll start by writing a piece of middleware we can use locally to restrict access to protected routes.

    Copy
    function protected(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'you shall not pass!!' });
    }
    }
    This middleware verifies that we have a session and that the userId is set. We could use username or any other value to verify access to a resource.

    Then, we add that middleware to the endpoints we’d like to protect.

    Copy
    server.get('/api/users', protected, (req, res) => {
    db('users') 
        .then(users => res.json(users))
        .catch(err => res.json(err));
    });
    The /api/users endpoint is only accessible when the client is logged in.

    In this section, we’ll use JSON Web Tokens to handle authentication.

    To produce and verify the token, we’ll use the jsonwebtoken npm module.

    Follow Along
    Let’s produce and send a token on a successful login.

    add jsonwebtoken to the project and require it into auth-router.js.
    change the /login endpoint inside the auth-router.js to produce and send the token.
    Copy
    // ./auth/auth-router.js

    const jwt = require('jsonwebtoken'); // installed this library

    router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user); // new line
    
            // the server needs to return the token to the client
            // this doesn't happen automatically like it happens with cookies
            res.status(200).json({
            message: `Welcome ${user.username}!, have a token...`,
            token, // attach the token as part of the response
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
        })
        .catch(error => {
        res.status(500).json(error);
        });
    });

    function generateToken(user) {
    const payload = {
        subject: user.id, // sub in payload is what the token is about
        username: user.username,
        // ...otherData
    };

    const options = {
        expiresIn: '1d', // show other available options in the library's documentation
    };

    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
    }
    add the ./config/secrets.js file to hold the jwtSecret
    Copy
    // the secrets will be safely stored in an environment variable, these are placeholders for development.
    module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'add a third table for many to many',
    };
    require secrets.js into auth-router.js: const secrets = require('../config/secrets.js');

    Login with the student/hired user and show the token.
    Review the steps taken one more time.
    We have a server that can produce and send JWTs on a successful login.

    

    We can see that a middleware function takes three parameters, the request and response objects, and a third parameter that is a function that points to the next middleware in the queue. By convention, we name the third parameter next. Please stick to that convention in your code.

    Any middleware in the queue CAN modify both the request and response objects, but it’s NOT required. In this case, we are not making changes to either.


    Now let’s add our shiny middleware to the queue! Right after server.use(express.json()); add the following line. --global middleware

    Copy
    server.use(logger);

    Now let’s add the authentication middleware that only grants access if we hit the correct route; picking any other route is futile, so be careful! -- Local middleware

    Copy
    function auth(req, res, next) {
    if (req.url === '/mellon') {
        next();
    } else {
        res.send('You shall not pass!');
    }
    }
    Now let’s add a route handler that leads to safety:

    Copy
    server.get('/mellon', auth, (req, res) => {
    console.log('Gate opening...');
    console.log('Inside and safe');
    res.send('Welcome Traveler!');
    });




• Use SQL to create and query a local database, table schemas, configure scripted schema migrations & seed scripts

    In relational databases, the data is stored in tabular format grouped into rows and columns (similar to spreadsheets). A collection of rows is called a table. Each row represents a single record in the table and is made up of one or more columns.

    Tables
        Tables organize data in rows and columns.
        Each row on a table represents one distinct record.
        Each column represents a field or attribute that is common to all records.
        Fields should have a descriptive name and a data type appropriate for the attribute it represents.
        Tables usually have more rows than columns
        Tables have primary keys that uniquely identify each row.
        Foreign keys represent the relationships with other tables.

    To insert new data into a table, we’ll use the INSERT command. The basic syntax for an INSERT statement is this:

    Copy
    insert into <table name> (<selection>) values (<values>)
    Using this formula we can specify which values will be inserted into which fields like so:

    Copy
    insert into Customers (Country, CustomerName, ContactName, Address, City, PostalCode)
    values ('USA', 'Lambda School', 'Austen Allred', '1 Lambda Court', 'Provo', '84601');
    Modifying a database consists of updating and removing records. For these operations, we’ll use UPDATE, and DELETE commands, respectively.

    The basic syntax for an UPDATE statement is:

    Copy
    update <table name> set <field> = <value> where <condition>;
    The basic syntax for a DELETE statement is:

    Copy
    delete from <table name> where <condition>;


    Note that the WHERE clause should come after the FROM clause. The ORDER BY clause always goes last.


    Copy
    select * from employees where salary > 50000 order by last_name;
    Limiting results using the LIMIT clause.
    When we wish to see only a limited number of records, we can use a LIMIT clause.

    The following returns the first 10 records in the products table:

    Copy
    select * from products
    limit 10
    LIMIT clauses are often used in conjunction with ORDER BY. The following shows us the 5 cheapest products:

    Copy
    select * from products
    order by price desc
    limit 5
    Inserting data using INSERT

    -- we can add fields in any order, the values need to be in the same ordinal position
    -- the id will be assigned automatically
    insert into Customers (Country, CustomerName, ContactName, Address, City, PostalCode)
    values ('USA', 'Lambda School', 'Austen Allred', '1 Lambda Court', 'Provo', '84601');

    delete from Customers
    where CustomerName = 'Lambda School`;


    Query Building with Knex
        While raw SQL is a critical baseline skill, Node developers generally use an ORM or query builder to write database commands in a backend codebase. Both ORMs and query builders are JavaScript libraries that allow us to interface with the database using a JavaScript version of the SQL language.

        For example, instead of a raw SQL select:

        Copy
        SELECT * FROM users;
        We could use a query builder to write the same logic in JavaScript:

        Copy
        db.select('*').from('users');
        Query builders are lightweight and easy to get off the ground, whereas ORMs use an object-oriented model and can provide more heavy lifting within their rigid structure.

        Within this sprint, we will use a query builder called knex.js.

        knex is our query builder library, and sqlite3 allows us to interface with a sqlite database. We’ll learn more about sqlite and other database management systems in the following module. For now, just know that you need both libraries.

    Next, we use Knex to set up a config file:

    Copy
    const knex = require('knex');

    const config = {
    client: 'sqlite3',
    connection: {
        filename: './data/posts.db3',
    },
    useNullAsDefault: true,
    };

    module.exports = knex(config);
    In Knex, the equivalent of SELECT * FROM users is:

    Copy
    db.select('*').from('users');
    There’s a simpler way to write the same command:

    Copy
    db('users');
    Using this, we could write a GET endpoint.

    Copy
    router.get('/api/users', (req, res) => {
    db('users')
    .then(users => {
        res.json(users);
    }) 
    .catch (err => {
        res.status(500).json({ message: 'Failed to get users' });
    });
    });
    NOTE: All Knex queries return promises.

    Knex also allows for a where clause. In Knex, we could write SELECT * FROM users WHERE id=1 as

    db('users').where({ id: 1 });
    This method will resolve to an array containing a single entry like so: [{ id: 1, name: 'bill' }].

    Using this, we might add a GET endpoint where a specific user:

    Copy
    server.get('api/users/:id', (req, res) => {
    const { id } = req.params;

    db('users').where({ id })
    .then(users => {
        // we must check the length to find our if our user exists
        if (users.length) {
        res.json(users);
        } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to get user' });
    });
    });


    
    Knex Setup
        To use Knex in a repository, we’ll need to add two libraries:

        Copy
        npm install knex sqlite3
        knex is our query builder library, and sqlite3 allows us to interface with a sqlite database. We’ll learn more about sqlite and other database management systems in the following module. For now, just know that you need both libraries.

        Next, we use Knex to set up a config file:

        Copy
        const knex = require('knex');

        const config = {
        client: 'sqlite3',
        connection: {
            filename: './data/posts.db3',
        },
        useNullAsDefault: true,
        };

        module.exports = knex(config);
        To use the query builder elsewhere in our code, we need to call knex and pass in a config object. We’ll be discussing Knex configuration more in a future module, but for now, all we only need the client, connection, and useNullAsDefault keys as shown above. The filename should point towards the pre-existing database file which can be recognized by the .db3 extension.

        GOTCHA: The file path to the database should be with respect to the root of the repo, not the configuration file itself.

        Once Knex is configured, we can import the above config file anywhere in our codebase to access the database.

        Copy
        const db = require('../data/db-config.js);
        The db object provides methods that allow us to begin building queries.

    SELECT using Knex
        In Knex, the equivalent of SELECT * FROM users is:

        Copy
        db.select('*').from('users');
        There’s a simpler way to write the same command:

        Copy
        db('users');
        Using this, we could write a GET endpoint.

        Copy
        router.get('/api/users', (req, res) => {
        db('users')
        .then(users => {
            res.json(users);
        }) 
        .catch (err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
        });
        NOTE: All Knex queries return promises.

        Knex also allows for a where clause. In Knex, we could write SELECT * FROM users WHERE id=1 as

        Copy
        db('users').where({ id: 1 });
        This method will resolve to an array containing a single entry like so: [{ id: 1, name: 'bill' }].

        Using this, we might add a GET endpoint where a specific user:

        Copy
        server.get('api/users/:id', (req, res) => {
        const { id } = req.params;

        db('users').where({ id })
        .then(users => {
            // we must check the length to find our if our user exists
            if (users.length) {
            res.json(users);
            } else {
            res.status(404).json({ message: 'Could not find user with given id.' })
        })
        .catch (err => {
            res.status(500).json({ message: 'Failed to get user' });
        });
        });

    INSERT using Knex
            
        In Knex, the equivalent of INSERT INTO users (name, age) VALUES ('Eva', 32) is:

        Copy
        db('users').insert({ name: 'Eva', age: 32 });
        The insert method in Knex will resolve to an array containing the newly created id for that user like so: [3].

    UPDATE using Knex
        In knex, the equivalent of UPDATE users SET name='Ava', age=33 WHERE id=3; is:

        Copy
        db('users').where({ id: 3 })
        .update({name: 'Ava', age: 33 });
        Note that the where method comes before update, unlike in SQL.

        Update will resolve to a count of rows updated.

    DELETE using Knex
        In Knex, the equivalent of DELETE FROM users WHERE age=33; is:

        Copy
        db('users').where({ age: 33}).del();
        Once again, the where must come before the del. This method will resolve to a count of records removed.




    What is a DBMS?
        To manage digital databases we use specialized software called DataBase Management Systems (DBMS). These systems typically run on servers and are managed by DataBase Administrators (DBAs).

        In less technical terms, we need a type of software that will allow us to create, access, and generally manage our databases. In the world of relational databases, we specifically use Relational Database Mangement Systems (RDBMs). Some examples are Postgres, SQLite, MySQL, and Oracle.

        Choosing a DBMS determines everything from how you set up your database, to where and how the data is stored, to what SQL commands you can use. Most systems share the core of the SQL language that you’ve already learned.

        In other words, you can expect SELECT, UPDATE, INSERT, WHERE , and the like to be the same across all DBMSs, but the subtleties of the language may vary.

    What is SQLite?
        SQLite is the DBMS we primarily use at Lambda. As the name suggests, it is a more lightweight system and thus easier to get set up than some others.

        SQLite allows us to store databases as single files. Many of the challenges and guided projects in Lambda have a .db3 extension. That is the database.

        SQLite is not a database (like relational, graph, or document

    A database schema is the shape of our database. It defines what tables we’ll have, which columns should exist within the tables and any restrictions on each column.

    One rquirement every table should satisfy: a primary key. A primary key is a way to identify each entry in the database uniquely. It is most often represented as a auto-incrementing integer called id or [tablename]Id.


    Knex provides a schema builder, which allows us to write code to design our database schema. However, beyond thinking about columns and constraints, we must also consider updates.

    This is where migrations come into play.

    A database migration describes changes made to the structure of a database. Migrations include things like adding new objects, adding new tables, and modifying existing objects or tables.

    We’ll need to update the location (or desired location) of the database as well as add the useNullAsDefault option. The latter option prevents crashes when working with sqlite3.

        Copy
        module.exports = {

        development: {
            // our DBMS driver
            client: 'sqlite3',
            // the location of our db
            connection: {
            filename: './data/database_file.db3',
            },
            // necessary when using sqlite3
            useNullAsDefault: true
        }

        };
        Now, wherever we configure our database, we may use the following syntax instead of hardcoding in a config object.

        Copy
        const knex = require('knex');

        const config = require('../knexfile.js');

        // we must select the development object from our knexfile
        const db = knex(config.development);

        // export for use in codebase
        module.exports = db;


        We can generate a new migration with the following command:

    knex migrate:make [migration-name]

    If we needed to create an accounts table, we might run:

    knex migrate:make create-accounts

    Note that inside data/migrations/ a new file has appeared. Migrations have a timestamp in their filenames automatically. Wither you like this or not, do not edit migration names.

    The migration file should have both an up and a down function. Within the up function, we write the ended database changes. Within the down function, we write the code to undo the up functions. This allows us to undo any changes made to the schema if necessary.

    Copy
    exports.up = function(knex, Promise) {
    // don't forget the return statement
    return knex.schema.createTable('accounts', tbl => {
        // creates a primary key called id
        tbl.increments();
        // creates a text field called name which is both required and unique
        tbl.text('name', 128).unique().notNullable();
        // creates a numeric field called budget which is required
        tbl.decimal('budget').notNullable();
    });
    };

    exports.down = function(knex, Promise) {
    // drops the entire table
    return knex.schema.dropTableIfExists('accounts');
    };
    References for these methods are found in the schema builder section of the Knex docs.

    At this point, the table is not yet created. To run this (and any other) migrations, use the command:

    knex migrate:latest

    Note if the database does not exist, this command will auto-generate one. We can use SQLite Studio to confirm that the accounts table has been created.

    Changes and Rollbacks
    If later down the road, we realize you need to update your schema, you shouldn’t edit the migration file. Instead, you will want to create a new migration with the command:

    knex migrate:make accounts-schema-update

    Once we’ve written our updates into this file we save and close with:

    knex migrate:latest

    If we migrate our database and then quickly realize something isn’t right, we can edit the migration file. However, first, we need to rolllback (or undo) our last migration with:

    knex migrate:rollback

    Finally, we are free to rerun that file with knex migrate latest.

    NOTE: A rollback should not be used to edit an old migration file once that file has accepted into a master branch. However, an entire team may use a rollback to return to a previous version of a database.


    Seeds

        Often we want to pre-populate our database with sample data for testing. Seeds allow us to add and reset sample data easily.

        Follow Along
        The Knex command-line tool offers a way to seed our database; in other words, pre-populate our tables.

        Similarly to migrations, we want to customize where our seed files are generated using our knexfile

        Copy
        development: {
            client: 'sqlite3',
            connection: {
            filename: './data/produce.db3',
            },
            useNullAsDefault: true,
            // generates migration files in a data/migrations/ folder
            migrations: {
            directory: './data/migrations'
            },
            seeds: {
            directory: './data/seeds'
            }
        }
        To create a seed run: knex seed:make 001-seedName

        Numbering is a good idea because Knex doesn’t attach a timestamp to the name like migrate does. Adding numbers to the file name, we can control the order in which they run.

        We want to create seeds for our accounts table:

        knex seed:make 001-accounts

        A file will appear in the designated seed folder.

        Copy
        exports.seed = function(knex, Promise) {
        // we want to remove all data before seeding
        // truncate will reset the primary key each time
        return knex('accounts').truncate()
            .then(function () {
            // add data into insert
            return knex('accounts').insert([
                { name: 'Stephenson', budget: 10000 },
                { name: 'Gordon & Gale', budget: 40400 },
            ]);
            });
        };
        Run the seed files by typing:

        knex seed:run

    You can now use SQLite Studio to confirm that the accounts table has two entries.

    Foreign keys are a type of table field used for creating links between tables. Like primary keys, they are most often integers that identify (rather than store) data. However, whereas a primary key is used to id rows in a table, foreign keys are used to connect a record in one table to a record in a second table.

    We can use a JOIN to combine query data from multiple tables using a single SELECT statement.

    There are different types of joins; some are listed below:

    inner joins.
    outer joins.
    left joins.
    right joins.
    cross joins.
    non-equality joins.
    self joins.
    Using joins requires that the two tables of interest contain at least one field with shared information. For example, if a departments table has an id field, and an employee table has a department_id field, and the values that exist in the id column of the departments table live in the department_id field of the employee table, we can use those fields to join both tables like so:

    Copy
    select * from employees
    join departments on employees.department_id = departments.id
    This query will return the data from both tables for every instance where the ON condition is true. If there are employees with no value for department*id or where the value stored in the field does not correspond to an existing id in the departments table, then that record will NOT be returned. In a similar fashion, any records from the departments table that don’t have an employee associated with them will also be omitted from the results. Basically, if the id does not show as the value of department_id for an employee, it won’t be able to join.

    We can shorten the condition by giving the table names an alias. This is a common practice. Below is the same example using aliases, picking which fields to return and sorting the results:

    Copy
    select d.id, d.name, e.id, e.first_name, e.last_name, e.salary
    from employees as e
    join departments as d
    on e.department_id = d.id
    order by d.name, e.last_name

    There are several ways of writing joins, but the one shown here should work on all database management systems and avoid some pitfalls, so we recommend it.

    The syntax for performing a similar join using Knex is as follows:

    Copy
    db('employees as e')
    .join('departments as d', 'e.department_id', 'd.id')
    .select('d.id', 'd.name', 'e.first_name', 'e.last_name', 'e.salary')

    While we can write database code directly into our endpoints, best practices dictate that all database logic exists in separate, modular methods. These files containing database access helpers are often called models


    To handle CRUD operations for a single resource, we would want to create a model (or database access file) containing the following methods:

    Copy
    function find() {
    }

    function findById(id) {
    }

    function add(user) {
    }

    function update(changes, id) {
    }

    function remove(id) {
    }
    Each of these functions would use Knex logic to perform the necessary database operation.

    Copy
    function find() {
    return db('users');
    }
    For each method, we can choose what value to return. For example, we may prefer findById() to return a single user object rather than an array.

    Copy
    function findById(id) {
    // first() returns the first entry in the db matching the query
    return db('users').where({ id }).first();
    }
    We can also use existing methods like findById() to help add() return the new user (instead of just the id).

    Copy
    function add(user) {
    db('users').insert(user)
    .then(ids => {
        return findById(ids[0]);
    });
    }
    Once all methods are written as desired, we can export them like so:

    Copy
    module.exports = {
    find,
    findById, 
    add, 
    update, 
    delete
    }
    …and use the helpers in our endpoints

    Copy
    const User = require('./user-model.js');

    router.get('/', (req, res) => {
    User.find()
    .then(users => {
        res.json(users);
    })
    .catch( err => {
    });
    });






    Data Modeling

    The relational database model is different from the object model we use in our JavaScript code. In JavaScript we can add arrays or nested objects to our entities. A client can have multiple address embedded as an array. But that same relationship in a relational model could result in data repetition and other anomalies.

    In this section we’ll learn the basic principles of data normalization and how to recognize a denormalized table.

    Overview
    Normalization is the process of designing or refactoring database tables for maximum consistency and minimum redundancy.

    With objects, we’re used to denormalized data, stored with ease of use and speed in mind. Non-normalized tables are considered ineffective in relational databases.

    Follow Along
    Data normalization is a deep topic in database design. To begin thinking about it, we’ll explore a few basic guidelines and some data examples that violate these rules.

    Normalization Guidelines
    Each record has a primary key.
    No fields are repeated.
    All fields relate directly to the key data.
    Each field entry contains a single data point.
    There are no redundant entries.
    Denormalized Data
    farm_name	animal1	animal2	animal3
    Beech Ranch	pigs	chickens	goats
    Morton Farms	horses	chickens	cows
    This table has two issues. There is no proper id field (as multiple farms may have the same name), and multiple fields are representing the same type of data: animals.

    farm_id	farm_name	animals
    1	Beech Ranch	pigs, chickens, goats
    2	Morton Farms	horses, chickens, cows
    While we have now eliminated the first two issues, we now have multiple entries in one field, separated by commas. This isn’t good either, as its another example of denormalization. There is no “array” data type in a relational database, so each field must contain only one data point.

    animal_id	animal	farm_name	ann_revenue
    1	pig	Beech Ranch	65000
    2	chicken	Beech Ranch	65000
    3	goat	Beech Ranch	65000
    Now we’ve solved the multiple fields issue, but we created repeating data (the farm field), which is also an example of denormalization. As well, we can see that if we were tracking additional ranch information (such as annual revenue), that field is only vaguely related to the animal information.

    When these issues begin arising in your schema design, it means that you should separate information into two or more tables.

    Anomalies
    Obeying the above guidelines prevent anomalies in your database when inserting, updating, or deleting. For example, imagine if the revenue of Beech Ranch changed. With our denormalized schema, it may get updated in some records but not others:

    animal_id	animal	farm_name	ann_revenue
    1	pig	Beech Ranch	45000
    2	chicken	Beech Ranch	65000
    3	goat	Beech Ranch	65000
    Similarly, if Beech Ranch shut down, there would be three (if not more) records that needed to be deleted to remove a single farm.

    Thus a denormalized table opens the door for contradictory, confusing, and unusable data.

    Challenge
    What issues does the following table have?

    name	city	state	powers
    John Doe	Miami	FL	none
    Jane Doe	Miami	FL	none
    Frank Castle	New York	NY	kidnapping, extortion
    Tony Stark	New York	NY	wealth
    Peter Parker	New York	NY	spider-sense, webbing
    Dig Deeper
    Database Normalization (Wikipedia)
    Database normalization is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity.
    Description of the database normalization basics
    Learn to explain different table relationships
    When modeling the data for our systems we’ll start noticing the relationships that exist between our entities. Those relationships need to be added to our resulting model.

    The way we model the relationship between our entities will influence how easy (or difficult) querying data will be.

    Overview
    There are three types of relationships:

    One to one.
    One to many.
    Many to many.
    Determining how data is related can provide a set of guidelines for table representation and guides the use of foreign keys to connect said tables.

    Follow Along
    One to One Relationships
    Imagine we are storing the financial projections for a series of farms.

    We may wish to attach fields like farm name, address, description, projected revenue, and projected expenses. We could divide these fields into two categories: information related to the farm directly (name, address, description) and information related to the financial projections (revenue, expenses).

    We would say that farms and projections have a one-to-one relationship. This is to say that every farm has exactly one projection, and every project corresponds to exactly one farm.

    This data can be represented in two tables: farms and projections

    id	farm_name
    1	Beech Ranch
    2	Morton Farms
    id	farm_id	revenue
    1	1	65000
    2	2	105000
    The farm_id is the foreign key that links farms and projections together.

    Notes about one-to-one relationships:

    The foreign key should always have a unique constraint to prevent duplicate entries. In the example above, we wouldn’t want to allow multiple projections records for one farm.
    The foreign key can be in either table. For example, we may have had a projection_id in the farms table instead. A good rule of thumb is to put the foreign key in whichever table is more auxiliary to the other.
    You can represent one-to-one data in a single table without creating anomalies. However, it is sometimes prudent to use two tables as shown above to keep separate concerns in separate tables.
    One to Many Relationships
    Now imagine, we are storing the full-time ranchers employed at each farm. In this case, each rancher would only work at one farm however, each farm may have multiple ranchers.

    This is called a one-to-many relationship.

    This is the most common type of relationship between entities. Some other examples:

    One customer can have many orders.
    One user can have many posts.
    One post can have many comments.
    Manage this type of relationship by adding a foreign key on the “many” table of the relationship that points to the primary key on the “one” table. Consider the farms and ranchers tables.

    id	farm_name
    1	Beech Ranch
    2	Morton Farms
    id	rancher_name	farm_id
    1	John Doe	1
    2	Jane Doe	1
    3	Jim Done	2
    4	Jay Dow	2
    5	Jen Dunn	1
    In a many-to-many relationship, the foreign key (in this case farm_id) should not be unique.

    Many to Many Relationships
    If we want to track animals on a farm as well, we must explore the many-to-many relationship. A farm has multiple animals, and multiple of each type of animal is present at multiple different farms.

    Some other examples:

    an order can have many products and the same product will appear in many orders.
    a book can have more than one author, and an author can write more than one book.
    To model this relationship, we need to introduce an intermediary table that holds foreign keys that reference the primary key on the related tables. We now have a farms, animals, and farm_animals table.

    id	farm_name
    1	Beech Ranch
    2	Morton Farms
    id	animal
    1	pig
    2	chicken
    3	goat
    farm_id	animal_id
    1	1
    1	2
    1	3
    2	2
    While each foreign key on the intermediary table is not unique, the combinations of keys should be unique.