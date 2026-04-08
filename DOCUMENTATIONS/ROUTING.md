The essence of ``client-side`` routing in **SPA**s is to handle all the routing logic using only JS without making additional GET request for some new HTML document.(SPA ~ only one HTML for our entire application).  
With client-side routing, when a user clicks on a site, the client-side router only swaps the component to the other allowing for faster render than that of a GET request to the server.  

### Limits of Client-Side Routing.
- **Loading of CSS & Javascript:** Since we are now loading all of our CSS and Javascript on the initial GET request it can take a while to load our first page. This can be important as the first page load can take a long time if you have a huge application.  
- **Analytics:** Analytic tools normally track page views, but an SPA doesn't have pages in the traditional sense, so this makes it harder for analytical tools to track page views. We will need to add extra scripts to handle this limitation.  
- Single-page applications with client-side routing are harder to design than traditional multi-page applications.  

### Advantages of React Router.
- **Conditional rendering of components based on the URL:**  when the URL is ``/movies``, the ``<Movie>`` component is displayed. 
- **Programmatic navigation using JavaScript:** when a link to the Movie page is clicked, the URL changes to ``/movies`` and the content is updated without making a request for a new HTML document.  
All the React Router build on top of the features built into JS via different web APIs, primarily **``Location``** and **``History``** APIs.  

#### The Location API.
You can access the location in the URL bar from any website by typing this in the console in the browser's dev tools: 
```js
window.location;
```
This will return a Location object with all kinds of useful information, including the ``pathname``.  
If we were designing client-side routing ourselves without React Router, the ``pathname`` in particular would be useful for associating a component with a "page" in our application:  
```js
function App() {
  let currentPage;
  if (window.location.pathname === "/movies") {
    currentPage = <Movies />;
  } else if (window.location.pathname === "/about") {
    currentPage = <About />;
  } else {
    currentPage = <h2>404 not found</h2>;
  }

  return (
    <div>
      <h1>Movie Maker 3000</h1>
      {currentPage}
    </div>
  );
}
```
At a  basic level, having some conditional rendering based on the URL is key to any client-side routing solution.   
#### The History API.
Whenever we load a new page in the browser, that information is saved in browser history. Go to the JavaScript console in the browser and type:  
```js
window.history;
```
Should return something like;  
```js
{ length: 32, state: null, scrollRestoration: "auto" };
```
The ``length`` is how many `locations` you have `visited` in this window session.  
To revert to the last location in the browser history;  
```js
window.history.back();
```
Forward equivalent;
```js
window.history.forward()
```
With JavaScript's History API, we also have the ability to use the **window.history.pushState()** method to programmatically navigate to a new page.   
This method takes in three parameters:  
1. **state:** a plain JavaScript object that is associated with the new history entry we are going to create with the `pushState()` function.
1. **title:** currently ignored by most browsers and it is safe to just pass an empty string here.
1. **url:** the URL for the new history entry. The browser will not attempt to load this URL after it calls pushState.  
An example of a programmatically coded URL in the console;
```js
const newState = {
  goal: "Learn about pushState()",
};

window.history.pushState(newState, "new state", "new-state");
```
You should notice that the browser has now changed ot show `new-state` at the end of the URL.  
Typing: 
```js
window.history.state;
```
Should return : 
```js
{
  goal: "Learn about pushState()";
}
```
If you now use the `window.history.back()` function you will not go back to the previous page, but your URL address will return to the `original URL address`. If you use `window.history.forward()` you will move back to our new URL that ends in `new-state`.  
In a React application, we could use the History API to change the default behavior of an `<a>` tag to use pushState instead of making a GET request to the provided URL:   
```jsx
function NavBar() {
  function navigate(e) {
    // don't make a GET request
    e.preventDefault();
    // use pushState to navigate using the href attribute of the <a> tag
    window.history.pushState(null, "", e.target.href);
  }

  return (
    <nav>
      <a href="/movies" onClick={navigate}>
        Movies
      </a>
      <a href="/about" onClick={navigate}>
        About
      </a>
      <a href="/login" onClick={navigate}>
        Login
      </a>
    </nav>
  );
}
```

# REACT ROUTER
React Router enables client-side routing which allows us to render different portions of our webpage using the browser's History API instead of making requests to our server for a new webpage.  
##### Installation
Below is the process indicating how it's done with vesrion spec;
```
npm install react-router-dom@6
```
To implement routes, we need to import ``createBrowserRouter`` and ``RouterProvider`` from `react-router-dom`.  
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
// Import of the react-router functions
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
```
**createBrowserRouter** Used to create the router for our application.  
We'll pass it an array of route objects as its argument. Each route object will have a routing path and a corresponding element to be rendered on that path.  
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);
```
**RouterProvider** provides the router created by createBrowserRouter to our app., so that it can use React-Router's client-side routing.  
```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
```
# Links and NavLinks
React Router provides two components that allow users to navigate through our page using client-side routing: `Link` and `NavLink`.   
They both have the same base level functionality:  
1. They render an `<a>` tag to the DOM.  
2. When the `<a>` tag is clicked, they change the URL and tell React Router to re-render the page, displaying the component that matches the new URL.  
3. Instead of taking an `href` attribute like normal `<a>` tags, Link and NavLink take a ``to`` prop that points to the endpoint the link should take the user to.  
`NavLink` acts as a *superset* of `Link`, adding a default **active** class**when it matches the current**.  
NavLink works well for creating a `navigation bar`, since it allows us to ``add styling`` to indicate which link is currently selected.   
`Link` is a good option for creating standard `hyperlinks`.  
```jsx
<NavLink to="/about">About</NavLink>
```
An example of a Navbar with styling;
```jsx
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <NavLink
        to="/"
        /* styling to Navlink */
        className="nav-link"
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="nav-link"
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        className="nav-link"
      >
        Login
      </NavLink>
    </nav>
  );
};

export default NavBar;
```
Navbar.css;
```jsx
.nav-link{
    display: inline-block;
    box-sizing: border-box;
    width: 60px;
    padding: 5px;
    margin: 0 6px 6px;
    background: blue;
    text-decoration: none;
    text-align: center;
    font-size: min(10vw, 15px) ;
    color: white;
}

.active {
    color: red;
}
```
### Do It Better!
The most scalable, eligible and simplistic way to deal with the NavBar component especially when handling Protected Routing is to assume the approach; 
```jsx
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { NavLink } from "react-router-dom";

function Navbar () {
    const {currentUser} = useContext(AuthContext)
    
    const NAV_ITEMS = [ 
                // {path: "/", label:"App", roles: ["user", "admin", "guest"]},
                {path: "/", label:"Home", roles: ["user", "admin"]},
                {path: `/profile/${currentUser.id || 1}`, label:"Profile", roles: ["user", "admin"]},
                {path: "/article", label:"Article", roles: ["admin"]},
                {path: "/admin", label:"AdminDashboard", roles: ["admin"]},
            ]
    const visibleNavItems = NAV_ITEMS.filter(item => currentUser && item.roles.includes(currentUser.allowedRoles))        
    return (
        <nav>
            {visibleNavItems.map(item => (
                <NavLink
                 key={item.path}
                 to={item.path}
                 className="nav-link"
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    )
}
```

You can then place your NavBar component in each of your page components to enable easy navigation between different pages in your application.  
```jsx
import { useState, useEffect } from "react"
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";

function Home() {
  const [users, setUsers] = useState([])

  useEffect(() =>{
    fetch("http://localhost:4000/users")
      .then(r => r.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, [])

  const userList = users.map(user =>{
    return <UserCard key={user.id} user={user}/>
  });

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Home!</h1>
        {userList}
      </main>
    </>
  );
};

export default Home;
```
# Dynamic Routes and URL Params.
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, 
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/profile/:id",
    element: <UserProfile />
  }
]);
```
By including a URL parameter (or multiple parameters) in a route, we make that route dynamic — this single route can actually have many different URLs. Eg. */profile/1*.      
The specific user details are not displayed which propels us to the last piece of the puzzle --- the **useParams** hook.  
**useParams:** allows us to access the data we've stored in our URL parameters and use it within our components.  
```jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const params = useParams();
  console.log(params);
  ....
```
After typing the id on the URL, you should see logged to the console: 
```js
{id: '1'}
```
Note that the key is the parameter we defined in our route, and the value is what appears in the URL.  
We can now use the data contained in our params object to access the specific piece of data we want to display. We can interpolate the id of the user into a fetch request URL and fetch that user's specific information from our backend:  
```jsx
const [user, setUser] = useState({});
const params = useParams();
const userId = params.id;

useEffect(() =>{
  fetch(`http://localhost:4000/users/${userId}`)
  .then(r => r.json())
  .then(data => setUser(data))
  .catch(error => console.error(error))
}, [userId]);
```
We can now update the JSX to display our specific users name and also add some conditional rendering to make sure our app doesn't error out while it's waiting for our user to be fetched:  
```jsx
if(!user.name){
  return <h1>Loading...</h1>;
};
<h1>{user.name}</h1>
```

# Error Handling.
What if somebody enters a route that doesn't exist?  
Create one more page in our application: `ErrorPage.js`.  
```jsx
import NavBar from "../components/NavBar";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Whoops! Something went wrong!</h1>
      </main>
    </>
  );
}

export default ErrorPage;
```
**useRouteError:** hook allows us to interact with the error itself, including the error status and its message.  
Now that we have that, we can add this ErrorPage to each of our routes using the ``errorElement`` field within our route objects:
```jsx
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }, 
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/profile/:id",
    element: <UserProfile />,
    errorElement: <ErrorPage />
  }
]);
```
The `errorElement` can handle more than just bad URLs — it will redirect your app toward the provided Error component should any error occur within your main UI component. For that reason, we'll want to make sure each of our routes has an appropriate `errorElement`.

### Heads Up.
``errorElement`` is a feature of modern *Data Routers*(v6.4+ and v7).    
``errorBubbling`` where Errors "bubble up" the route tree and  If a child route throws an error but has no `errorElement`, the nearest parent with one will catch it and render its error UI also applies to the modern routing.  
**Other:** Applications that are created using create-react-app have a built-in React Error Overlay used in development mode. If your page generates an error during development, you will still see the React Error Overlay over your browser page, even with the errorElement included. You can see the errorElement by closing the Error Overlay.   

# Nested Routing.
Allows us to ``re-render specific pieces of a web page when a user navigates to a new route`` rather than re-rendering the entire page.  
It also allows easy ``re-use of components`` and also makes navigation of websites smoother.  
##### Requirements. 
1. `children` attribute on route objects.  
2. `Outlet` component.
3. `useOutletContext` hook.

For our previous case, the only way we could have declared global state for our application would have been through creating our own `contextProvider` with the `useContext` hook, but it is nice to have a parent component that can instanteate and pass down global application state when the app first loads.  

### Rendering Nestes Routes as "children".
`react-router-dom` gives us a variety of options we can include in our route objects; so far, we've covered path, element, and errorElement. Another option, `children`, is how we can tell a route that it has nested routes.  
```jsx
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ErrorPage from "./pages/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
             {
                path: "/",
                element: <Home />
            }, 
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile/:id",
                element: <UserProfile />
            }
        ]
    }
];

export default routes;
```
By entering our different route objects as an array associated with our App route's children key, we've set them up to render inside of our *App* component. That means that if we navigate to any of these nested routes — such as */login*, for example — our App component will render with our *Login* component as a child component.  
*Note that it's okay for our Home component to have the same path as our parent App component. All child route paths must start with their parent's route path, and one of them (but only one) can exactly match its parent's route path.*  

*But the best way to handle this is to use the `index` property one of the common 'gotchas' being:Since both components are active at the same time, if you have a CSS class named .container in App.css and another .container in Home.css, they might fight each other. Using CSS Modules or Tailwind prevents this "safety" issue.*  
```jsx
{
    path: "/",
    element: <App />,
    children: [
        {
            index: true, // Use this instead of path: "/" ~ explicitly tells the router "This is the default child for the parent."
            element: <Home />
        },
    ]
}
```
Now that all of our routes are children of App, we can just include our errorElement on App — any errors that occur in one of our nested routes will "bubble up" to the parent route, which will render our ErrorPage. Much DRYer.  
Alternatively, you can render unique errorElements for each route, if you want to create different error handling pages for different routes.  
Since App now renders no matter what URL we visit, we can just include our NavBar component directly within our App, rather than dropping it into every page-level component:  
```jsx
import NavBar from "./components/NavBar";

function App(){
    return(
        <>
            <header>
                <NavBar />
            </header>
        </>
    );
};
```
Remember to remove the header containing the NavBar from the other components after adding this code to App.
###  Outlet Component.
An Outlet component is included within a component that has nested routes.   
It basically serves as a signal to that parent component that it will render various different components as its children, depending on what route a user visits.   
The Outlet component works in conjunction with the router to determine which component should be rendered based on the current route.
```jsx
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App(){
    return(
        <>
            <header>
                <NavBar />
            </header>
            <Outlet />
        </>
    );
};
```
### Passing Data via useOutletContext. 
We're invoking the Outlet component within the parent component instead of any of our child components, so we can't pass props in our usual way.  
After including the Outlet component in the `App` component, we will have to modify `Home`, the immediate child of `App` to use the Outlet component.   
We can pass data to our Outlet component via a context prop, then access it in whatever child component needs the data using the useOutletContext hook. 
```jsx
<Outlet context={data}/>
```
```jsx
const data = useOutletContext();
```
If you want to pass multiple pieces of data, you can pass either an array or an object to the context prop, then destructure it when you invoke the useOutletContext hook:  
```jsx
<Outlet context={{firstProp: firstData, secondProp: secondData}}/>
```
```jsx
const {firstProp, secondProp} = useOutletContext();
```
Let's re-structure App to pass down props to the children components to depict the Outlet context.  
```jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App(){
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:4000/users")
        .then(r => r.json())
        .then(data => setUsers(data))
        .catch(error => console.error(error));
    }, []);

    return(
        <>
            <header>
                <NavBar />
            </header>
            <Outlet context={users}/>
        </>
    );
};
```
In Home we can use the `useOutletContext` to receive the data then use the piece of data then pass it down to the Child components using `Outlet`.  
```jsx
import { Outlet, useOutletContext } from "react-router-dom";
import UserCard from "../components/UserCard";

function Home(){
    const users = useOutletContext();
    const userList = users.map(user => <UserCard key={user.id} user={user}/>);

  return (
      <main>
        <h1>Home!</h1>
        <Outlet />
        {userList}
      </main>
  );
};

export default Home;
```
### Accessing Outlet Context Within Child Components.
The subsequent child elements don't need to again pass down the contxt but only to receive their required props.  
```jsx
import { Link, useOutletContext } from "react-router-dom";

function UserCard({user}) {
    const users = useOutletContext();
    console.log(users);

  return (
    <article>
        <h2>{user.name}</h2>
        <p>
          <Link to={`/profile/${user.id}`}>View profile</Link>
        </p>
    </article>
  );
};

export default UserCard;
```
However, there is a huge caveat when dealing with deeply nested routes.  
### useOutletContext and Deeply Nested Routes. 
For the case below; 
```jsx
const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
             {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/profile/:id",
                        element: <UserProfile />
                    }
                ]
            }, 
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
];
```
Our *Home* route is nested within our *App* route, and our *UserProfile* route is nested within our *Home* route.  
If we provide a piece of data to the Outlet component within our *App*, and we want to access it within our *UserProfile* component, we'll have to pass that data to the *Outlet* component within our *Home* component *first*.  
Essentially, `useOutletContext` only looks at the **immediate parent Outlet** for data. So, if we have one Outlet nested within another Outlet, we'll need to make sure we pass data to that **inner Outlet** as well: 
```jsx
import { Outlet, useOutletContext } from "react-router-dom";
import UserCard from "../components/UserCard";

function Home(){
    const users = useOutletContext();
    const userList = users.map(user => <UserCard key={user.id} user={user}/>);

  return (
      <main>
        <h1>Home!</h1>
        <Outlet context={users}/>
        {userList}
      </main>
  );
};

export default Home;
```
Now we can access the data within our UserProfile component.  
```jsx
import { useParams, useOutletContext } from "react-router-dom";

function UserProfile() {
  const params = useParams();
  const users = useOutletContext();

  const user = users.find(user => user.id === parseInt(params.id));

  if (!user){
    return <h1>Loading...</h1>
  }

  return(
      <aside>
        <h1>{user.name}</h1>
      </aside>
  );
};

export default UserProfile;
```
*(Note): We're using an aside here instead of main because UserProfile is now being rendered as a child of Home, and Home already has a main element. HTML best practices dictate that there should be only one main element per page view. And, since UserProfile only appears on a nested route, we're displaying it in an aside, as it will appear alongside the list of users we're rendering.*  
# Programmatic Navigation. 
Our app needs to direct users to specific URLs after logging or completing a certain task, all without having them click a buton.  
All these require programmatic navigation.   
### The useNavigate Hook. 
Its use is pretty straight-forward.  
- First, we import it into the component in which we want to use ; 
- Next, we need to invoke our useNavigate hook within our component and save the returned function in a variable.  
- Then, whenever we want to use programmatic navigation, we'll simply pass the route we want to navigate our user to as an argument to the navigate function.  
```jsx
import { useState, useEffect } from "react";
// Add useNavigate to import
import { Outlet, useNavigate} from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
    // Add code to mock user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = () =>{
    setIsLoggedIn(true);
  }

  const logout = () =>{
    setIsLoggedIn(false);
  };

    // Add programmatic navigation for login and logout
  useEffect(() =>{
    if (isLoggedIn) {
        // navigates to Home route if user is logged in
      navigate("/");
    } else {
        // navigates to Login route if user is logged out
      navigate("/login");
    };
  }, [isLoggedIn]);

  return (
    <div className="app">
      <NavBar logout={logout} />
        { /*Pass login function to Outlet as context */}
      <Outlet context={login}/>
    </div>
  );
};

export default App;
```
*(Note): We placed our call to navigate within our useEffect because we want to navigate our user after they've successfully logged in or out. By placing the state that dictates whether or not a user is logged in or out within the dependency array of our useEffect, we can programmatically navigate our user whenever a change in state occurs. This approach means we only call navigate once our state has updated. You don't always have to put navigate inside of a useEffect, but it makes sense to do so in this case.*  
Now, we can update our NavBar component to handle user logout functionality.  
```jsx
import { NavLink} from "react-router-dom";
import "./NavBar.css"
function NavBar({ logout }) {

  return (
    <nav>
      <NavLink
        to="/"
        className="nav-link" 
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="nav-link"
      >
        About
      </NavLink>
      {/* Add the logout function to handle the onClick event */}
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default NavBar;
```
And we can update our Login component to handle user login.  
```jsx
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Login() {
  // Access the login function passed as context
  const login = useOutletContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create a function that calls the login function when the form is submitted
  function handleLogin(e) {
    e.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleLogin}>
      <label for="username">Username</label>
      <div>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <label for="password">Password</label>
      <div>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />      
      </div>
      <button type="submit">Login</button>
  </form>
  );
};

export default Login;
```
### The Navigate Component.
In addition to the useNavigate hook, React Router also provides a special component for redirecting users to a new location: the `Navigate` component.  
To use the Navigate component, we simply invoke it the same way we would invoke any other component, then pass it a `to` prop that points toward a route endpoint: `<Navigate to="/login" />`.  
This component is particularly useful in cases where you need to handle some conditional rendering.  
For example, in the *App* component below, instead of rendering our *NavBar* component we can render a *Navigate* component that will navigate to the */login* endpoint if the user is not logged in:  
```jsx
import { useState, useEffect} from "react";
import { Outlet, Navigate, useNavigate} from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


   const login = () =>{
    setIsLoggedIn(true);
  };

  const logout = () =>{
    setIsLoggedIn(false);
  };

  useEffect(() =>{
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="app">
{/* Add conditional rendering so users have to be logged in to see pages on the site */}
      {isLoggedIn ? <NavBar logout={logout}  /> : <Navigate to="/login" />}
      <Outlet context={login}/>
    </div>
  );
};

export default App;
```