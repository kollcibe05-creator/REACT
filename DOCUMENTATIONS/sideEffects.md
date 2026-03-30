The main effect of a React component is to return JSX, but of course, there are some functions that React components can achieve like:   
1. Fetching Data
2. setInterval, setCount
3. Writing to the file system.
4. Making network requests.
6. Subsrcibe to a chat service.
7. Manually change the DOM.
8. Updating a page outside of the page of React,,,

*''An operation, function or expression is said to have a side effect if it modifies some state variable value(s) outside its local environment, that is to say has an observable effect besides returning a value (the main effect) to the invoker of the operation.''*  
By default, ``useEffect`` will run our side effect function every time the component re-renders.
```
render -> useEffect -> setState -> re-render -> useEffect
```
Sometimes we want to run our side effect in certain conditions, for instance, fetching data only when the component first renders.  
``passing a second argument to the useEffect``, a **dependencies array**, prevents this especially when the *fetch* requests are doomed to endlessly loop making requests until the API kicks out for hitting the rate limit.  
```
render -> useEffect -> setImages -> render -> useEffect -> setImages -> render -> etc...
```
Example below demonstrates useEffect at play:  
```jsx
import { use, useEffect, useState } from "react"

function UseEffect () {
    const [time, setTime] = useState(new Date().toLocaleString())
    const [count, setCount] = useState(1)
    const [countDown, setCountDown] = useState(20)
    useEffect(() => {
       
        const timeId = setTimeout(() => setTime(new Date ().toLocaleString()), 1000)
        return function () {
            clearTimeout(timeId) //cleanup function
        }        
    }
    // ,[] //deps array
    )

    return (
        <>
         <p>{time}</p>
        </>
    )
    
}
export default UseEffect;
```
### Performing Side Effects
One kind of side effect we can demonstrate here is updating parts of the webpage outside of the React DOM tree.  
React is responsible for all the DOM elements rendered by our components, but there are some parts of the webpage that live outside of this tree.   
Take, for instance, the ``<title>`` of our page. Updating this part of the page would be considered a side effect, so we'll use a useEffect to update it.  
```jsx
useEffect(() => {
  document.title = text;
}, [text]);
```
What we're telling React: *''Hey React! When my component renders, I also want you to update the document's title. But you should only do that when the text variable changes.''*

```jsx
useEffect(() => {
  setTimeout(() => setCount(0), 5000);
}, []);
```
*''Hey React! When my App component renders, I also want you to set this timeout function. In 5 seconds, you should update state and set the count back to 0. You should only set this timeout function once, I don't want a bunch of timeouts running every time my component updates.''*

### useEffect Dependencies CheatSheet
- ``useEffect(() => {})``: No dependencies array
Run the side effect every time our component renders (whenever state or props change)
- ``useEffect(() => {}, [])``: Empty dependencies array
Run the side effect only the first time our component renders
- ``useEffect(() => {}, [variable1, variable2])``: Dependencies array with elements in it
Run the side effect any time the variable(s) change  
*''The question is not 'when does this effect run' but 'with which state does this effect synchronize with'     
``useEffect(fn) //all state``  
``useEffect(fn, []) //no state``  
``useEffect(fn, [these, states])``
''*
### useEffect Cleanup
When using the useEffect hook in a component, you might end up with some long-running code that you no longer need once the component is removed from the page.  
Even after a component like a timer is removed, you'll see that the **setInterval or setTimeout function will continue to run in the background**.  
You'll see a warning message stating:  
```
index.js:1 Warning: Can't perform a React state update on an unmounted
component. This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup
function.
```
**``Returning a cleanup function, which will run when the component is unmounted i.e when it is no longer being returned by its parent``** is the solution.  
```jsx 
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // returning a cleanup function
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  return <div>{time.toString()}</div>;
}
```
### Cleanup Function Lifecycle
So far, we've explained the order of operations for our components like this:  
```
render -> useEffect -> setState -> re-render -> useEffect
```
Where does the cleanup function fit in this order of operations? In general, it is called by React ``after the component re-renders`` as a result of setting state and ``before the useEffect callback is called``:  
```
render -> useEffect -> setState -> re-render -> cleanup -> useEffect
```
If the change (as in our example) causes the component to be unmounted, the cleanup is the last thing that occurs in the component's life:  
```
render -> useEffect -> setState -> re-render -> cleanup
```

