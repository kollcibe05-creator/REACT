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
