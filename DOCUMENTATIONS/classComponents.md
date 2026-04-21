So far, we've been writing all our components as **function components**.  
Initially the only way to use `state` and `lifecycle methods` were via **class components**.  
The most basic format of a component using the function component syntax: 
```jsx
function BlogPost(props) {
    return (
        <article>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </article>
    )
}
```
The class syntax will take the format:  
```jsx
import React from "react"
class  BlogPost extends React.Component {
    render() {
        return (
            <article>
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>
            </article>
        )
    }
}
```
Note that irregardless of which syntax we use to define the component, we can use both versions of the component the same way.  
```jsx
ReactDOM.render(
  // doesn't matter if BlogPost is a class component or a function component!
  <BlogPost title="Hello" content="World" />,
  document.getElementById("root")
);
```
- `class Blogpost` the class declaration gives us a template for creating JS objects. In this case the type of object we are trying to create is a React component.  
- `extends React.Component` the `extends` keyword is JS' way of providing inheritance to our class definitions. Our components must inherit from the `React.Component` class.  
- `render()` method is a special `lifecycle method` that must be defined on all of our class components. Just like with our function components, `render` is responsible for returning JSX.   
- `this.props` when the React runs anytime we use `<BlogPost>` in a parent component, React will make a new **object** for us by calling a constructor function `new BlogPost(props)` for us.  
All of the props passed down from the parent will be saved to that newly created object. So to access the props, we can use `this.props` inside of any method defined in our component.  
```jsx
//when we write something like this
ReactDOM.render(
    <BlogPost title='Hello' content="World"/>, 
    document.getElementById("root")
)

//something like this happens in React's internal code
const component = new BlogPost({title: "Hello", content: "World."})

//So inside the component, the props object is saved to the object. 
class Component {
    constructor(props) {
        this.props = props
    }
}
```
# Class Methods and Event Handling 
#### Defining Methods
In a typical function, we can have *helper functions* within the component so that those functions have access to data that is in the scope of our component.  
```jsx
function TodoList(props) {
  function displayTodos() {
    return props.todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
  }

  return <ul>{displayTodos()}</ul>;
}
```
Since `displayTodos` is defined within the TodoList component, it has access to all the data in the component(including props) via its outer scope.  
With a class component, we can define methods that will give us a similar functionality.  
```jsx
import React from "react"
class TodoList extends React.Component {
    displayTodos() {
        return this.props.map(todo => <li key={todo.id}>{todo.text}</li>)
    }
    render() {
        return <ul>this.displayTodos()</ul>
    }
}
```
In our example, both *render* and *displayTodos* are methods defined on our component. To call the *displayTodos* from *render*, we must write *this.displayTodos*.  
Instead of having to share data via props, these two have access to the same `this` thus share data via `context`.  
So calling `this.props` in *render* method will give us the same data as calling `this.props` in the *displayTodos*.  
We could have also written all of the functionality inside the `render` component.   
```jsx
render() {
    function displayTodos () {
        return this.props.todos.map (todo => <li key={todo.id}>{todo.text}</li>)
    }
    return <ul>{displayTodos()}</ul>;
}
```
However, it's common to define functions as their own standalone methods.  

# Classes With Event Handlers
When writing class components, it's a common practice to define an event handler as a method within the class.  
```jsx
import React from "react"
class Clicker extends React.Component {
    handleClick (event) {
        console.log(`${event.target.name}`)
    }
    render () {
        return (
            <div>
                <button name="one" onClick={this.handleClick}>
                One
                </button>
                <button name="two" onClick={this.handleClick}>
                Two
                </button>
            </div>
        )
    }
}
```
So far our buttons are working just fine. However, if we need to access the value of `this` inside of `handleClick`, we'll see something unexpected.   
```jsx
class Clicker extends React.Component {
  handleClick(event) {
    console.log(this); // => undefined
  }

  render() {
    console.log(this.props); // => { message: "hi" }
    return (
      <div>
        <button name="one" onClick={this.handleClick}>
          One
        </button>
        <button name="two" onClick={this.handleClick}>
          Two
        </button>
      </div>
    );
  }
}

// passing in props
ReactDOM.render(<Clicker message="hi" />, document.querySelector("#root"));
```
Due to the complex rules of `this` keyword, **when we use a class method as a callback, we will no longer have access to our component via the `this` keyword.**  
We have several options in order to keep access of `this` inside our event handler.  
##### 1. Use an arrow function to define the event handler
```jsx
import React from "react"
class Clicker extends React.Component {
    handleClick = () => {
        console.log(this.props) //=> {message: "h1"}
    } 
    render () {
        return (
            return <button onClick={this.handleClick}>One</button>;
        )
    }
}
```
Most common approach.  
##### 2. Use an arrow function to invoke the event handler. 
```jsx
import React from "react"
class Clicker extends React.Component {
  handleClick() {
    console.log(this.props); // => { message: "hi" }
  }

  render() {
    return <button onClick={() => this.handleClick()}>One</button>;
  }
}
```
Using an arrow function works here because we are invoking the `handleClick` method `on the *this* object and arrow functions don't create their own context.`  
##### 3. Bind the event handler explicitly.   
```jsx
import React from "react"
    class Clicker ends React.Component {
        constructor (props) {
            super(props)
            this.handleClick = this.handleClick.bind(this)
        }
        handleClick(event) {
            console.log(this.props)
        }
        render() {
            return <button onClick={this.handleClick}>One</button>;
        }

    }    
```
*You can also define all of your component's methods using arrow functions, if remembering all of these rules feels like too much! This is theoretically less performant, but it's unlikely you or your users will notice a difference.*
# Using State in Class components
Before React Hooks came, using state was only possible in class components.  
#### Initializing State
In JSX, to initialize state we use the `useState` Hook.  
```jsx
import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("incomplete");

  const displayedTodos = todos
    .filter((todo) => todo.status === filter)
    .map((todo) => <li key={todo.id}>{todo.text}</li>);

  return <ul>{displayedTodos}</ul>;
}
```
In class components, we create an initial state by adding a special property of `state` to our component instance.  
```jsx
import React from "react";

class TodoList extends React.Component {
        //Initialize state as an object
        state = {
            todos: [], 
            filter: "incomplete"
        }
        const displayedTodos = this.state.todos 
            .filter(todo => todo.status === this.state.filter)
            .map(todo => <li key={todo.id}>{todo.text}</li>)

        render() {
            return <ul>{displayedTodos}</ul>
        }
}
```
In even older React code bases, you might see state initialized like: 
```jsx
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // initialize state as an object
    this.state = {
      todos: [],
      filter: "incomplete",
    };
  }

  render() {
    // access state by calling `this.state`
    const displayedTodos = this.state.todos
      .filter((todo) => todo.status === this.state.filter)
      .map((todo) => <li key={todo.id}>{todo.text}</li>);

    return <ul>{displayedTodos}</ul>;
  }
}
```
Both of these version work, only that in our first case, we are using a relatively new feature of JS called **public instance fields** but thanks to **Babel** we can safely use this new feature and still support old browsers.   
You'll also notice that in the render method, we can access our state values by calling this.state. Just like with props, we need to use this to access data that is saved to our component.  
#### Setting State
In function components, we have setter function like:
```jsx
setFilter("complete")
```
In class version, we have `this.setState()`  
When we use `this.setState`, we pass in an object with the key in state we're trying to update, like; 
```jsx
this.setState ({
    filter: "complete"
})
```
Or this; 
```jsx
this.setState({
    todos: [...this.state.todos, newTodo]
}) 
```
Notice that we are using `setState` to update `individual` state even though our initial state was: 
```jsx
state = {
  todos: [],
  filter: "incomplete",
};
```
That's right. No need for a fancy spread operator or anything. We only pass the `key of the state we are trying to change.`  
This is because, **state updates are merged.**   
Also because, just like when we use the setter function from useState, calling setState will only update the values of our component's state and cause our component(and its children) to `re-render`.     
#### Setting State is Asynchronous 
As noted when we learned about the useState hook, setting state is asynchronous, which means that `state is not immediately updated when we call the setter function`:  
```jsx
function increment() {
  console.log(`before setState: ${count}`);
  // => 0
  setCount(count + 1);
  console.log(`after setState once: ${count}`);
  // => 0
  setCount(count + 1);
  console.log(`after setState twice: ${count}`);
  // => 0
}
```
The same is true for the case of class components; 
```jsx
increment() {
  console.log(`before setState: ${this.state.count}`);
  // => 0
  this.setState({
    count: this.state.count + 1
  });
  console.log(`after setState once: ${this.state.count}`);
  // => 0
  this.setState({
    count: this.state.count + 1
  });
  console.log(`after setState twice: ${this.state.count}`);
  // => 0
}
```
However, if we pass a **callback function** to setState instead of passing an `object`, we can access the current value of state between each function call:  
```jsx
increment() {
  this.setState(prevState => {
    console.log(prevState.count) // => 0
    return { count: prevState.count + 1 }
  });
  this.setState(prevState => {
    console.log(prevState.count) // => 1
    return { count: prevState.count + 1 }
  });
}
```
In this version of setState, we provide a callback function that will be called with the previous values of state for this component. The callback should return an object with any values from state that we want to update.  
*To update state, we must use the this.setState function with either an object, or a callback function that returns an object.*
# React Component Lifecycle 
#### Component Lifecycle
React components have two common set of properties: `props` and `state`.  
Props are given to the component by its parent. You can think of it as an external influence that the component has no control over. A component's state can change in conjuction to the props changing or when the user interacts with the component.   
The React framework was created to enable devs to create complex and highly reactive UIs. This enables the components to quickly adapt to changes from user interactions or updates in the app.  
To achieve this, React components go through what we call a **component cycle.**  
This is broadly divided into `three` parts:   
1. `creation`  
2. `updating`  
3. `deletion`  

This means that every single thing you see in apps written in React is actually a React component and/or a part of one.   
For example, if you open a new chat window in a website written in React, a `ChatWindow` component is `created`. As you are interacting with it and sending messages to your friends — that's the `updating` part. And when you finally close the window, the React component gets  `deleted`.  
#### Lifecycle Methods and Rendering.  
In order to enable this quick reacting and updating, as a dev, you get access to certain built-in events in the React components lifecycle called **lifecycle methods**. These are opportunities for one to change how the component reacts(or doesn't react) to various changes in one's app.  
These methods are called *lifecycle* because they are called at different times in the component's lifecycle -- *just before it's created, after, and when it's about to be deleted*.  
The only required method for a React class component to be valid is the `render()` method, which describes what the HTML for the component looks like. There are a whole host of optional methods you can use if you need more control over how the component responds to change. The optional methods will be called if you include definitions for them in a component. Otherwise, React will follow its default behavior.  
Of course there are many other lifecycle methods.  
## Pre-mounting 
It is important to remember that class components at their core are basically JS classes.  
This means that even before mounting has begun, the class's `constructor` function is called.  
While the constructor is not related to the mounting to the DOM, it's the first function to be called upon the initialization of a component.  
In older code, you'll often encounter the `constructor` method when initializing state and binding methods.  
```jsx
class App extends React.Component {
  constructor(props) {
    super(props)
    state = {
      count: 0
    }; 
    this.handleClick.bind.(this)
  }
}
```
In newer React codebases, you're less likely to encounter the constructor method.   
## Mounting 
When the component is initially created, it gets mounted onto the DOM.   
`"Mounting"` for React means getting the component's JSX (whatever is returned by the render method) and creating DOM elements based on that JSX.    
After the mounting stage, there is one commmonly used *lifecycle* method available to us: `***componentDidMount**`  
The `componentDidMount` method will get called just after the `render` method.  
You will use this method to set-up any longer-running processes or asynchronous processes such as fetching or updating data.  It is better to render and display something to your user even if all of your data isn't ready yet. Once it is ready, React can just re-render and use the API content.    
The `**componentDidMount**` lifecycle method is *roughly* equivalent to using the `useEffect` hook in a function component with an `empty dependencies array`.     
In both cases, we have a place to run some code immediately after the component has been rendered to the DOM. Here's a quick side-by-side:  
```jsx
function ChatWindow() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // 3. side effect function is called
    fetch("http://localhost:3000/messages")
      .then(r => r.json())
      .then(messages => setMessages(messages))
  }, [])

  // 2. function returns JSX
  return (
    // JSX
  )
}
```
```jsx
class ChatWindow extends React.Component {
  // 1. constructor is callled (state is initialized)
  constructor(props) {
    super(props)
    state = {
      messages: []
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000/messages")
    .then(r => r.json())
    .then(messages => this.setState({messages}))
  }
  render () {
    return (
      //JSX
    )
  }

} 
```
## Updating 
Whenever a component's state or props are changed, its get re-rendered on the page. That's the beauty of React components — they're quick to react to changes. A re-render could be triggered when a user interacts with the component, or if new data (props or state) is passed in. For example, going back to the chat window example, whenever you press "send" on a message, the `ChatWindow` component gets re-rendered as it needs to display an extra message. Whenever a re-render is triggered,   `render` is called, returning the JSX for React. React uses this JSX to figure out what to display on the page.   
After render is called, the `**componentDidUpdate**` mehtod is called just after the component is re-rendered and updated.   
It is possible in `componentDidUpdate` to take some actions `without triggering a re-render` of the component, such as *focusing* on a specific form input.   
You will have access to the previous props and state as well as the current ones, and you can use this method to update any third party libraries if they happen to need an update due to the re-render.  
Comparing to our hooks examples, `componentDidUpdate` can also be used in a similar way to `useEffect` to trigger side effects in response to changes to a component's state or props.   
```jsx
// 1. function is called
// 4. function is called again after setting state in useEffect
function ChatRoom() {
  const [roomId, setRoomId] = useState(1);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 3. useEffect callback is called after initial render
    // 6. useEffect callback is called again if roomId changes
    fetch(`http://localhost:3000/rooms/${roomId}/messages`)
      .then((r) => r.json())
      .then((messages) => setMessages(messages));
  }, [roomId]);

  // 2. function returns JSX
  // 5. function returns JSX
  return; // JSX
}
```
```jsx
class ChatRoom extends React.Component {
  // 1. constructor is called
  // (using class field syntax, we don't need to write the constructor method)
  state = {
    messages: [],
    roomId: 1,
  };

  // 3. componentDidMount is called
  componentDidMount() {
    fetch(`http://localhost:3000/rooms/${this.state.roomId}/messages`)
      .then((r) => r.json())
      .then((messages) => this.setState({ messages }));
  }
  // 5. when setState is called, componentDidUpdate runs after render
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.roomId !== this.state.roomId) {
        fetch(`http://localhost:3000/rooms/${this.state.roomId}/messages`)
        .then((r) => r.json())
        .then((messages) => this.setState({ messages }));
    }
  }

  // 2. render is called
  // 4. render is called again after setting state in componentDidMount
  render () {
    return; //JSX
  }
}
```
*As you can see, in the example above there is some duplication of the logic in the `componentDidMount` and `componentDidUpdate` functions — this is one of the advantages of using `useEffect` instead.*  
## Unmounting
At the unmounting stage, the component gets deleted and cleared out of the page.   
The only lifecycle hook at this stage is `**componentWillUnmount**`, which is called just before the component gets removed. This is used to clean up after the component by removing timers, unsubscribing from connections, etc.  
For example, if you had a component that displays the weather data in your home town, you might have set it up to re-fetch the updated weather information every 10 seconds in `componentDidMount`. When the component gets deleted, you wouldn't want to continue doing this data-fetching, so you'd have to get rid of what was set up in `componentWillUnmount`.  
The closest equivalent to `componentWillUnmount` in function components is the `cleanup function that you can return from useEffect`. They aren't *strictly* equivalent, because the cleanup function from useEffect will run between each render, and `componentWillUnmount` will only run when the component is removed. But they are both used in similar cases. For example:  
```jsx
// 1. function is called
// 4. function is called again after setting state
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 3. useEffect callback runs (only once, since we gave an empty dependencies array)
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    // 6. cleanup function is called after the component is removed (by the parent component)
    return function () {
      clearInterval(interval);
    };
  }, []);

  // 2. function returns JSX
  // 5. function returns JSX
  return; // JSX
}
```
```jsx
class Timer extends React.Component {
  // 1. constructor is called
  state = { count: 0 };

  // 3. componentDidMount is called
  componentDidMount () {
    this.interval = setInterval((interval) => {
      this.setState(prevState => {
        return {
          count: prevState.count + 1
        }
      })
    }, 1000)
  }

  // 5. componentWillUnmount is called after the component is removed (by the parent component)
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render () {
    return; //JSX
  }
} 
```