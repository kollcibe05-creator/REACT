# useRef 
We may have two states in a single component, for instance, two counters, where a change in one of the states causes a re-render and a reset of the other component.    
To avoid the reset of the other state to its initial value, useRef is the go-to.  
To use it, we need to import it:  
```jsx
import {useRef} from "react"
```
Then we call it in our component and pass in the initial value: 
```jsx
const countRef = useRef(0)
```
Then for the event include the event handler triggering the change of the countRef: 
```jsx
 function handleRefClick() {
      countRef.current += 1
      console.log({ countRef })
  }
```
The reason for the dot-notation is that useRef returns an Object: 
```jsx
{current: 0}
```
The offset of useRef hook is that the changes occur internally but only are evident when the component re-renders which in most cases are usually a case of a change in other state.  

#### Case Example
We have a stock market analyzer which changes color basing on the change of price.  
This will require knowledge of the previous price state to determine the change.   
```jsx
import {useState, useRef, useEffect} 
import {makeRandomNumber} from "utils"

function Ticker () {
    const [price, setPrice] =  useState(0)
    const [color, setColor] = useState("black")
    const prevPriceRef = useRef(price)
    useEffect(() => {
        const prevPrice = prevPriceRef.current
        if (price > prevPrice) {
        setColor("green");
      } else if (price < prevPrice) {
        setColor("red");
      } else {
        setColor("black");
      }
      prevPriceRef.current = price
    },[price])

    useEffect(() => {
        const id = setInterval(() => setPrice(makeRandomNumber), 1000)
    })
    return function () {
        clearInterval(id)
    }
    return (
        <div>
            <h1>TickerMaster</h1>
            <h2 style={{color: color}}>Price: ${price}</h2>
        </div>
    )
}
export default Ticker
```
#### Another Case Example
We may have a button which if we click, we want to access the *div* content.  
```jsx
import {useRef} from "react"
function Box () {
    const elementRef = useRef()
    function handleClick() {
        const div = elementRef.current
        console.log("measurements", div.getBoundingClientReact()) //Special method to access the measurements. 
    }
    return (
        <div ref={elementRef}>   {/*The special ref to the div*/}
            <h1>Box</h1>
            <button onClick={handleClick}>Measure</button>        
        </div>
    )
}
export default Box
```
The `ref` will point to whichever element we pass it on, whether its a *h1* or *span*.  
The most common uses for useRef is when working witht third-party libraries that need access to the React rendered DOM elements, HTML Canvas Element, audio element,,,,  

# useReducer
It is an equivalent of the `useState` hook.  
It is used in cases where multiple states need to change concurrently, for instance, fetching data from an API.  
```jsx
import React, { useState, useEffect } from "react";
import { getPokemon } from "./api"

function Pokemon({ name = "pikachu" }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");  // idle/pending/resolved/rejected
  const [error, setError] = useState(null);

  console.log({ status, error, data })

  useEffect(() => {
    setStatus("pending");
    getPokemon(name)
      .then((data) => {
        setData(data);
        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, [name]);
  
  

  // got an error? display error status
  if (status === "rejected") {
    return (
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    );
  }

  // still fetching? display loading
  if (status !== "resolved") {
    return <p>Loading...</p>;
  }

  // all good! display pokemon
  return (
    <div>
      <h3>{data.name}</h3>
      <img src={data.sprite} alt={`${data.name} sprite`} />
    </div>
  );
}

export default Pokemon
```
For our case above, we are managing multiple states, all in a single function.  
The caveat is that there are massive ammount of re-renders and ultimately the states will be  out of sync.  
The re-renders of-course happen fast but for a large application, the lag will be evident.  
As depicted by the logs: 
```jsx
{status: "idle", error: null, data: null}
{status: "pending", error: null, data: null}
{status: "pending", error: null, data: {name: "ivysaur", sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"}}
{status: "resolved", error: null, data: {name: "ivysaur", sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"}}
```
The fix: 
```jsx
import React, { useState, useEffect, useReducer } from "react";
import { getPokemon } from "./api"

function Reducer (state, action) {
    if (action.type === "startFetch") {
        return { data: null, status: "pending", error: null
        }
    }else if (action.type === "resolvedFetch") {
        return { data: action.payload, status: "resolved", error: null
        }
    }else if (action.type === "errorFetch") {
        return { data: null, status: "rejected", error: action.payload
        }
    }
    return state
}
function Pokemon({ name = "pikachu" }) {

const [state, dispatch] =  useReducer(reducer, {
        data: null, 
        status: "idle", 
        error: null
    })

const [state, data, error] = state //we drop all the states and take up the *useReducer*`s one.  

  useEffect(() => {
    dispatch("startFetch") //No payload as we have no data to be passed.  
    // setStatus("pending");
    getPokemon(name)
      .then((data) => {
        dispatch({type: "resolvedFetch", payload:data})
        // setData(data);
        // setStatus("resolved");
      })
      .catch((error) => {
        dispatch({type: "errorFetch", payload: error})
        // setError(error);
        // setStatus("rejected");
      });
  }, [name]);
  
  

  // got an error? display error status
  if (status === "rejected") {
    return (
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    );
  }

  // still fetching? display loading
  if (status !== "resolved") {
    return <p>Loading...</p>;
  }

  // all good! display pokemon
  return (
    <div>
      <h3>{data.name}</h3>
      <img src={data.sprite} alt={`${data.name} sprite`} />
    </div>
  );
}

export default Pokemon
```
`useReducer` takes in some args: 
1. a `reducer` function
2. The `initial state` of the states  

The return value is an array with our `state` and our `dispatch()`er;  
```jsx
[{data: null, status: "idle", error: null}, ƒ()]
[{data: null, status: "idle", error: null}, ƒ()]
[{data: null, status: "idle", error: null}, ƒ()]
[{data: null, status: "idle", error: null}, ƒ()]
```
``Reducers``: 
- Are functions that take the `current state` and an `action` as args.  
- and return a new state result. In other words, (state, action) => newState

Reducers are written outside of the component as they are supposed to be `pure` functions.  
 

The way `action` works is via  the `dispatch` function where we pass the: 
1. `type`
2. `payload` which is basically the data. 

Revamped example: 
```jsx
import React, { createContext, useState, useReducer } from "react";

/*
implement useReducer in this component
- set an initial state for count and likedNumbers as an object
- create a reducer function
    - make sure to always return a NEW object!
- dispatch actions from increment, decrement, and like
*/ 

const CountContext = createContext()
function reducer (state, action) {
    switch(action.type) {
        
        case("incrementCount"): 
            return {
                ...state, 
                count: state.count + 1
        }
        
        case("decrementCount"): 
            return {
                ...state, 
                count: state.count - 1
            }
            
        case ("incrementLike") : 
            return {
                ...state, 
                likedNumbers: {
                    ...likedNumbers, 
                    [state.count]: (state.likedNumbers || 0) + 1
                }
            }
    
        default: 
            return state
}
}

function CountProvider({ children }) {
    
    const [state, dispatch] = useReducer(reducer, {
        count: 0, 
        likedNumbers: {}
    })
    const {count, likedNumbers} = state
    
    function increment() {
        dispatch({type:"incrementCount"})
    }

    function decrement() {
        dispatch({type:"decrementCountCount"})
    }

    function like() {
    dispatch({type: "incrementLike"})        
    }
    
    const value = {
        count,
        likedNumbers,
        increment,
        decrement,
        like
    }
    
    return (
        <CountContext.Provider value={value}>
            {children}
        </CountContext.Provider>
    )
}

export { CountContext, CountProvider }
```
# useMemo
**memoization** is the caching of a value so that it does not need to be re-calculated.    
It only runs when one of its dependencies update.  
`useMemo` and `useCallback` Hoooks are similar.  
useMemo returns a `memoized` value.   
useCallback returns a `memoized` function.     
`useCallback` is used for caching(memoizing) `function definitions` while `useMemo` is used for caching `computed values`.    
Use useCallback to pass stable callbacks to child components, preventing unnecessary re-renders. Use useMemo to cache heavy computations(eg. filtering large lists).  
We may have a function that runs on every render.  
When changing the count, you will notice a delay in action.  
```jsx
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = expensiveCalculation(count);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
        <p>Note that this example executes the expensive function also when you click on the Add Todo button.</p>
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

createRoot(document.getElementById('root')).render(
  <App />
);
```
We can use the useMemo Hook to memoize the expensive calculation, i.e, run only when needed.    
useMemo Hook accepts a second parameter to declare the dependencies.  
The args are:   
1. `function`
2. `dependencies array`. 

In the example below, function will only run when count is changed and not when todos are added.  
```jsx
import { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

createRoot(document.getElementById('root')).render(
  <App />
);
```

```jsx
import {useMemo, useState} from "react"
function App () {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11.........]
    function memoizedValue = useMemo(() => expensiveLargestNumber(), [arr])
    function expensiveLargestNumberFunction() {
        Math.max(...arr)
    }
    return (
        <>
            <h1>Largest Number: {memoizedValue}</h1>
        </>
    )
}
```
# memo()
It is a `higher order component` and `not` a Hook.  
Similar to `useMemo()` only that it holds components.  
There are scenarios where a parent component is responsible for rendering the child components and as expected, the child components re-render with each change on the parent's.  
This is usually unnecessary especially in cases where the child components have nothing to do with the parent component.   
That is where `memo` comes in.  
```jsx
import { memo } from "react";

const Parent = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = () => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild2 = () => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  };

  console.log("Parent rerendered");

  return (
    <>
      <p>Parent - {parent}</p>
      <button onClick={updateParent}>Update Parent</button>
      <button onClick={updateChild1}>Update Child 1</button>
      <button onClick={updateChild2}>Update Child 2</button>
      <Child1 value={child1} />
      <Child2 value={child2} />
    </>
  );
};

const Child1 = memo(({ value }) => {
  console.log("Child 1 rerendered");

  return (
    <p>Child 1 - {value}</p>
  );
});

const Child2 = memo(({ value }) => {
  console.log("Child 2 rerendered");

  return (
    <p>Child 2- {value}</p>
  );
});
```
```jsx
import {memo, useState} from "react"
const Child = (props) => {
    const [exampleState, setState] = useState("unchanged")
    return (
        <div>Will only re-render when the state in i changes.</div>
    )
}
export default memo(Child)  //The recipe here
```
# useCallback
Use callback, a React Hook, memoizes the `function`  
```jsx
import { memo } from "react";

const Parent = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = () => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild2 = () => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  };

  console.log("Parent rerendered");

  return (
    <>
      <p>Parent - {parent}</p>
      <button onClick={updateParent}>Update Parent</button>
      <Child1 value={child1} updateValue={updateChild1} />
      <Child2 value={child2} updateValue={updateChild2} />
    </>
  );
};

const Child1 = memo(({ value, updateValue }) => {
  console.log("Child 1 rerendered");

  return (
    <>
      <p>Child 1- {value}</p>
      <button onClick={updateValue}>Update Child 1</button>
    </>
  );
});

const Child2 = memo(({ value, updateValue }) => {
  console.log("Child 2 rerendered");

  return (
    <>
      <p>Child 2- {value}</p>
      <button onClick={updateValue}>Update Child 2</button>
    </>
  );
});
```
We will see that the child components will start re-rendering again.  
This is due to the `updateValue` props which is a function.  
This is the limitation of `memo`, it `only memorizes the value and not the function.`    
*Functions and objects in JS are of reference type  which means that it creates a new reference every time in the memory. So on every update object is making a new ref. and this is the reason why memo is not able to memoize it. Memo thinks that this is a new value thus re-renders the component.*  
```jsx
import { memo } from "react";

const Parent = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = useCallback(() => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  }, [child1]);

  const updateChild2 = useCallback(() => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  }, [child2]);

  console.log("Parent rerendered");

  return (
    <>
      <p>Parent - {parent}</p>
      <button onClick={updateParent}>Update Parent</button>
      <Child1 value={child1} updateValue={updateChild1} />
      <Child2 value={child2} updateValue={updateChild2} />
    </>
  );
};

const Child1 = memo(({ value, updateValue }) => {
  console.log("Child 1 rerendered");

  return (
    <>
      <p>Child 1- {value}</p>
      <button onClick={updateValue}>Update Child 1</button>
    </>
  );
});

const Child2 = memo(({ value, updateValue }) => {
  console.log("Child 2 rerendered");

  return (
    <>
      <p>Child 2- {value}</p>
      <button onClick={updateValue}>Update Child 2</button>
    </>
  );
});
```
`useCallback` accepts `two` params:   
1. the `function` you want to memoize.  
2.`deps array`. 
```jsx
import {useState, useCallback} from "react"
function App () {
    const memoizedCallback = useCallback(number => changeChildNumber(number), [])

    function changeChildNumber(number) {
        setChildNumber(number)
    }
    return (
        <div>
            <Child changeNumber={memoizedCallback}/>
        </div>
    )
}
```
As a result, we are going to use the same function, of course with different values, but the same object in memory instead of creating multiple others for the same cause.  



