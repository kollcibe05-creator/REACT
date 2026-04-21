One of the most powerful features of React hooks is that they give us the ability to share logic and state between multiple components by writing our `own custom hooks`.   
The ones we've already encountered are `useParams` and `useHistory` hooks from React Router tasked with helping us access the `params` and `history` objects from React Router in any component we want.  
You can basically create your own custom hooks by extracting hooks-related logic out of components and into a reusable hook function.  
# Extracting Custom Hooks 
In many components, especially for the case like ours,  `Homepage` and `ArticlePage`,  you'll find a title key because:     
- is displayed in the browser tab
- is also displayed in the browser history
- helps with accessibility and search engine optimization (SEO)

You'll find a `useEffect` hook in order to set a document title.  
Since we have similar logic for updating the title in both of our components (and we might want this functionality in other components as our app grows), this logic is a good candidate for a custom hook.      
Let's take the `useEffect` code from the `HomePage` component and place it in a file, inside a function called useDocumentTitle:
```jsx
import { useEffect } from "react";

function useDocumentTitle() {
  useEffect(() => {
    document.title = "Underreacted | Home";
  }, []);
}

export default useDocumentTitle;
```
So far, any time we've wanted to use a React hook (like `useState` or `useEffect`), we've only been able to do so inside of our React components (not inside of any other JavaScript functions).  
**Custom hooks also allow us to call React hooks**, `so long as we call them from a React component.`  
Another important convention to note here: the name of our custom hook starts with the word **use**. This is a signal to React (and ESLint) that our hook should follow the `Rules of Hooks`, and also a signal to other developers that this code is meant to be used as a React hook.  

# Using our Custom Hook
```jsx
import React, { useEffect, useState } from "react";
import About from "./About";
import ArticleList from "./ArticleList";
import useDocumentTitle from "../hooks/useDocumentTitle";

function HomePage() {
  // fetch data for posts

  // set the document title
  useDocumentTitle();

  // return ...
}

export default HomePage;
```
After that update, our component should work the same. But now our `HomePage` component doesn't have to worry about the logic for updating the document title: it just needs to call the `useDocumentTitle` hook, which will handle that work.  
Updating our `ArticlePage` component won't quite work with our new custom hook just yet, since the title is dynamic in this component:  
```jsx
function ArticlePage() {
  //...

  const pageTitle = post ? `Underreacted | ${post.title}` : "Underreacted";
  useEffect(() => {
    // depends on the page title
    document.title = pageTitle;
  }, [pageTitle]);

  //...
}
```
To solve this, we can update our useDocumentTitle hook to accept an argument of the page title:  
```jsx
function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
}
```
Now, both our components can use this custom hook by passing in a page title when calling the hook:  
```jsx
function ArticlePage() {
  //...

  const pageTitle = post ? `Underreacted | ${post.title}` : "Underreacted";
  useDocumentTitle(pageTitle);

  //...
}

// src/components/HomePage.js
function HomePage() {
  //...

  useDocumentTitle("Underreacted | Home");

  //...
}
```
# Returning Data from Custom Hooks 
One other common piece of logic that is shared between our components is fetching data from our API.  
Both the `ArticlePage` and `HomePage` share some similarities with regards to data fetching:  
- They both have a couple state variables related to data fetching (isLoaded, posts, posts)
- They both use the useEffect hook to fetch data as a side effect of rendering the component
By noticing these similarities, we can recognize what logic is coupled together and what we'd need to extract in order to build out our custom hook.  
Let's start with the `HomePage` component once again. Here's all of the logic that is related to working with our API:
```jsx
function HomePage() {
  // fetch data for posts
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:4000/posts")
      .then((r) => r.json())
      .then((posts) => {
        setPosts(posts);
        setIsLoaded(true);
      });
  }, []);

  // return ...
}
```
To start off with, let's take all this code out from our HomePage component and create a new custom hook called useQuery, for querying data from our API:  
```jsx
import { useState, useEffect } from "react";

function useQuery() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:4000/posts")
      .then((r) => r.json())
      .then((posts) => {
        setPosts(posts);
        setIsLoaded(true);
      });
  }, []);
}

export default useQuery;
```
Unlike our previous custom hook, however, we're going to need to get some data back out of this component. Specifically, when we're using this component, we'll need access to two things:  
- the data returned by the fetch request (`posts`)
- the `isLoaded` state

But how can we get this data out of the custom hook? Well, since a custom hook is just a function, all we need to do is have our hook **return** whatever data we need!
```jsx
import { useState, useEffect } from "react";

function useQuery() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:4000/posts")
      .then((r) => r.json())
      .then((posts) => {
        setPosts(posts);
        setIsLoaded(true);
      });
  }, []);

  // return an *object* with the data and isLoaded state
  return {
    posts: posts,
    isLoaded: isLoaded,
  };
}

export default useQuery;
```
Now, in order to use this custom hook, we can call it from our HomePage component, and destructure the return value to get the posts and isLoaded state out:  
```jsx
import useQuery from "../hooks/useQuery";

function HomePage() {
  // fetch data for posts
  const { posts, isLoaded } = useQuery();

  // ...
}
```
Our `HomePage` component is now significantly cleaner, because it no longer has to worry about all the logic related to handling the fetch request and setting state based on the response — all of that logic is now nicely encapsulated in our `useQuery` hook!  
In order to get this hook to work with the `ArticlePage` component as well, we need to refactor it a bit and abstract away the logic that is specific to the `HomePage` component's needs.  
```jsx
// take in the url
function useQuery(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  // rename `posts` to a more generic `data`
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoaded(false);
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      });
  }, [url]);
  // the url is now a dependency
  // we want to use the side effect whenever the url changes

  // return an *object* with the data and isLoaded state
  return { data, isLoaded };
}
```
Now, to use our more generic version of this hook in the `HomePage` component, we just need to make a couple small changes:  
```jsx
function HomePage() {
  const { data: posts, isLoaded } = useQuery("http://localhost:4000/posts");

  // ...
}
```
Since `useQuery` now accepts a URL for the fetch request, we must pass that URL in when we call the hook. It now also returns an object with a more generic name (`data`), so we can re-name that variable to `posts` when destructuring.   
The useQuery hook should now also work with our `ArticlePage` component:
```jsx
function ArticlePage() {
  const { id } = useParams();
  const { data: post, isLoaded } = useQuery(
    `http://localhost:4000/posts/${id}`
  );

  // ...
}
```
While our useQuery hook works nicely in this example, there are some optimizations we could make to improve it, such as:  
- Handling errors with `.catch` and adding an error state
- Using one state variable instead of multiple state variables, so that it doesn't re-render more than necessary
- Using the `useReducer` hook instead of `useState` to manage state transitions
- Caching our fetched data to prevent unnecessary network requests
- Cancel the fetch if the component un-mounts before the fetch is complete.  

The React community has also embraced custom hooks in a big way — major libraries like React Redux and React Router use custom hooks to provide a lot of their functionality, and there are lots of community generated custom hooks out there to explore and add to one's projects.  
There are pre-built solutions out there like `React Query` that handle this logic (and more) with a pre-built custom hook.    

