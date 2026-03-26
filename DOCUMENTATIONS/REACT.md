React is technically a library not a framework.  
This is due to the fact that it is declarative and not imperative.
Popular `frameworks` and tools have been built on top of it with it experience and more compelete addendum.
It is actively maintained by Facebook.
- **Next.js** ~ a fullstack React framework that adds features like server-side rendering, routing and file-based conventions.
- **Expo** ~ React Native framework for building universal iOS, Android and web apps with native UIs.

### Some Awesome React Features 
1. Declarative 
2. Component-based.
3. Learn Once, Write Anywhere 

### React Tools(2)
There are two main react tools:
1. **Create-React-App(CRA)**  
This tool is legacy and no longer maintained.
It comes about with additional tools that make React development better:
  - **Babel** - included transpiler that converts modern JS and custom code like JSX into more widely compatible JS.
  - **webpack** - a 'bundler' that takes all our work, along with any other required dependency code, and packages it all up into a single, transferrable bundle.
  - **Build in linting and code analysis functionality** using ``ESLint`` to help improve our code, reinforce best practices and catch common mistakes.
2. **Vite**


``Dependency tree`` can span as massively since each file has its own package.json and so on. All the downloaded packages are contained in the ``node_modules``. 
To run a lightweight server: 
```
npm install serve 
```
Then in package.json:
```js
"scripts": {
  "test": "echo 'Hello World!'",
  "start": "serve"
}
```
The additionally you can download ``esbuild`` ~ a JavaScript bundler, which is a tool that handles all of a project's dependencies, and combines the code into a single file that is browser-ready. 
```

npm install esbuild
```
Then in package.json add the script:
```js
"scripts": {
  "test": "echo 'Hello World!'",
  "start": "serve",
  "build": "esbuild index.js --bundle --outfile=dist/out.js"
}
```
When we run a build using esbuild, it makes sure that all the dependencies are included and up to date, and combines the code from multiple files into a single file that is ready to be loaded in the browser.  
Note that the name of this file is specified in the build command above: dist/out.js.
To run:
```
npm run build
```
That is after updating the script in the index.html file.
```html
<script src="index.js" type="module"></script>
```
Change the src property to ``dist/out.js``

Jest comes preinstalled when one generates a React project using CRA.

**Component**: a function that takes in props and returns JSX.    
They are dynamic  in that they can describe a template of JSX in which variables data can be populated.
```jsx
function BlogContent(props) {
  return <div>{props.articleText}</div>;
}
```
Note: For props that are strings, we don't need to place curly braces around the values; for other data types, we need curly braces
#### Perks of components
1. Are modular, reusable, and enable 'template' functionality.  
2. Help us organize our interface's logic and presentation.  
3. Enable us to think about each piece in isolation, and apply structure to complex programs.  

Utilizing destrucuring is key in passing down props.
Some props are pretty straightforward, but others are a bit out of hand. For instance: 
```jsx
const persona = {
  name: "Collins", 
  age: 5, 
  value: "pragmatism"
}
```
Remember that child elements receive an objectified prop and therefore the case above is a nested object. 
There are many ways to handle this, most common: 
- Destrucure as an arg then call them with the dot notation where needed.
```jsx
function Child ({persona}) {
    return (
        <>
        <h1>Child: What is on your mind man.</h1>
        <p>{persona.name} is {persona.age} old.</p>
        </>
    )
}
export default Child;
```
- Destructure it in the body of our component.
```jsx
function Child ({persona}) {
    const {name, age, value} = persona
    return (
        <>
        <h1>Child: What is on your mind man.</h1>
        <p>{name} is {age} old. He is full of  {value}.</p>
        </>
    )
}
export default Child;
```
- Or destructuring even better in the params.
```jsx
function Child ({persona: {name, age, value}}) {
    return (
        <>
        <h1>Child: What is on your mind man.</h1>
        <p>{name} is {age} old. He is full of  {value}.</p>
        </>
    )
}
export default Child;
```
#### React Fragments.
Allows a component to return multiple elements without adding a wrapper element that adds to the DOM.   
```jsx
<React.Fragment>
Whatever you type.
</React.Fragment>
```
Or even better;
```jsx
<>
Whatever you type.
</>
```
Fragments are not restricted to the outermost element being returned in JSX.

#### React Children
So far you've seen components rendered like this using the self-closing tag syntax: 
```jsx
function Example(props) {
  return <div>{props.exampleProp}</div>;
}

<Example exampleProp="example value" />;
```
However, React also allows you to use your components with an opening and closing tag, like most HTML elements:   
```jsx
<Example exampleProp="example value">
  <h1>Example header!</h1>
  <p>Some example text</p>
</Example>
```
#### Common Gotcha
If the children is not called in the child element, it won't be displayed.
```jsx
function Child (props) {
    // console.log(props)
    const {children, persona} = props
    console.log(children)
    return (
        <>
        <h1>Child: What is on your mind man.</h1>
        <p>{persona.name} is {persona.age} old. He is full of  {persona.value}.</p>
        {children}
        </>
    )
}
export default Child;
```
### Event Listeners
In cases where an event listener needs to pass a value to a callback function, we always need to provide a function ``definition``, not a function ``invocation`` to our event handlers.  
This is because calling it directly will fire the function even before the event is called.
```jsx
function MultiButton() {
  function handleClick(number) {
    console.log(`Button ${number} was clicked`);
  }

  return (
    <div>
      <button onClick={() => handleClick(1)}>Button 1</button>
      <button onClick={() => handleClick(2)}>Button 2</button>
      <button onClick={() => handleClick(3)}>Button 3</button>
    </div>
  );
}
```

1. **onClick** : any component.
2. **onChange**: used for input values often; ``<input>``, ``select``, ``<textarea>``.
```jsx
function ChangeItUp() {
  function handleChange(event) {
    console.log(`${event.target.name}: ${event.target.value}`);
  }

  return (
    <div>
      <input
        type="text"
        name="search"
        onChange={handleChange}
        placeholder="Enter search term..."
      />

      <select name="filter" onChange={handleChange}>
        <option value="all">Select a filter...</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
}
```
3. **onSubmit**: used with ``<form>``s
```jsx
function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("I submit");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Enter username..." />
      <input type="password" name="password" placeholder="Enter password..." />
      <button>Login</button>
    </form>
  );
}
```
You may have noticed when inspecting the event object that it's a bit different than the standard browser event.     
React's event object is a special object called: **SyntheticBaseEvent**.  
React has its own event system with special event handlers called **SyntheticEvent**.  
The reason for having a specific event system instead of using native events is cross-browser compatibility.  
Some browsers treat events differently, and by wrapping these events into a consistent API, React makes our lives a lot easier.  
It's important to keep in mind that they are the exact same events, just implemented in a consistent way!   
That means these events also have methods that you can call like ``preventDefault()``, ``stopPropagation()``, and so on.
#### Setting State is Asynchronous.
There is one very important caveat about how setters functions work that we need to explore: *it sets state asynchronously*.
When we execute *setCount*, it is *non-blocking*.  
It fires off a message to React's internals saying: "Hey, you need to update state to this value when you have a chance."  
The conponent finishes doing its current task before updating the state. In this case, finishes executing the *increment* function in full before updating the state.   
Since the new value of count is only available after React has re-rendered the component, we don't see immediate changes to that variable after *setCount()* has been called.   
 For this reason, React recommends using a slightly different syntax for setting state when working with values that are calculated based on the previous version of state (like our counter).  
To demonstrate the issue, consider the following:   
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    // call setCount twice, to update the counter by two every time we click
    setCount(count + 1);
    setCount(count + 1);
  }

  return <div onClick={increment}>{count}</div>;
}
```
Contrived example(you could have called setCount(count + 2)) but instead of getting the desired result you'll be surprised at the result.  
```jsx
function increment() {
  console.log(count);
  // => 0

  setCount(count + 1);
  // equivalent to setCount(0 + 1)

  console.log(count);
  // => 0

  setCount(count + 1);
  // equivalent to setCount(0 + 1)

  console.log(count);
  // => 0
}
```
Because *setState* is asynchronous — i.e., because the value of count isn't updated immediately — when setCount is called the second time, count is still equal to 0! As a result, we are effectively calling *setCount(1)* in both cases.  
React actually provides a built in solution for this problem.  
Rather than passing a new value into setCount, we can instead pass a callback function.  
That function, when called inside setCount, will be passed the state variable containing the current state of count. This is typically referred to as the previous state since it's the state before the current call to setCount is executed. With this knowledge, we can rewrite the increment function to:
```jsx
function increment() {
  setCount((currentCount) => currentCount + 1);
  setCount((currentCount) => currentCount + 1);
}
```
As a rule of thumb, any time you need to set state based on the current value of state, you should use the callback syntax.
### Rules of Hooks
1. **Only Call Hooks at the Top Level**  
Don’t call Hooks inside loops, conditions, or nested functions.  
When you're using a React Hook such as useState, it's important that the hook is called every time your component is rendered.     
The reason for this comes down to how React keeps track of which piece of state each variable is associated with — hooks must always be called in the same order.   
2. **Only Call Hooks from React Functions**  
Don’t call Hooks from regular JavaScript functions.  
React Hooks are meant to work specifically with React components, so make sure to only use Hooks inside of React components.  
``Custom hooks`` and ``React components`` are the only two places you can use React hooks.  
State is only for values that are expected to change during the component's life. It should be used sparingly.  
Here are some questions from Thinking in React that will help us decide if we need state:    
- Is it passed from a parent via props? If so, then it probably it isn't state.
- Can you compute it based on any other state or props in your component? If so it isn't state.
- Does it remain unchanged over time? If so, then it isn't state.

### Styling elements
```jsx
style={{background: "red"}}
```
### State in Arrays and Objects
Working with arrays and objects in state requires special care because of one simple rule:  
**React will only update state if a new object/array is passed to setState.**
From the React documentation on state: 

*''State can hold any kind of JavaScript value, including objects. But you shouldn't change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.''*

One key detail is that React re-renders components based on changes to state.  
For example, if we updated the code of our component in such a way that instead of incrementing the count when the button was clicked, we simply called setCount with the same value, React wouldn't re-render our component, since we gave it the same value for state as it already has.

Consider the following refactor.   
```jsx
function Counter() {
  const [count, setCount] = useState({ x: 0 });

  function handleClick() {
    // increment the count
    count.x++;
    // set state with the new count value
    setCount(count);
  }

  return <button onClick={handleClick}>{count.x}</button>;
}
```
If you try running this example code, you'll see that the component doesn't actually rerender with a new value.  
Why is this? Well, we're not actually providing a new value when we're calling setCount!
Just like in the previous example, setting state with the same value will not cause React to re-render our component. Even though we've mutated the value of the count object, the count object is still the same object in memory.  
Any time we need to update an object or array in state, we need to make a new object and call setState with the new object.
For our counter example, here's how that would work:  
```jsx
function Counter() {
  const [count, setCount] = useState({ x: 0 });

  function handleClick() {
    // set state with a new object
    setCount({ x: count.x + 1 });
  }

  return <button onClick={handleClick}>{count.x}</button>;
}
```
For the case of arrays: 
##### Adding Elements To Arrays In State
```jsx
function handleAddFood() {
  const newFood = getNewRandomSpicyFood();
  const newFoodArray = [...foods, newFood];
  setFoods(newFoodArray);
}
```
Remember, whenever we are updating state, it's important that we always pass a new object/array to setState. That's why we're using the spread operator here to make a copy of the array, instead of .push, which will mutate the original array.  

##### Removing Elements From Arrays In State
First, we'll need to add a click handler to the ``<li>`` elements, and pass in the id of the food we're trying to remove:
```jsx
const foodList = foods.map((food) => (
  <li key={food.id} onClick={() => handleLiClick(food.id)}>
    {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  </li>
));
```
Next, in the handleLiClick function, we need to figure out a way to update our array in state so it no longer includes the food.
One common approach to this problem of creating a new array that doesn't include a specific element is using the .filter method.
```jsx
function handleLiClick(id) {
  const newFoodArray = foods.filter((food) => food.id !== id);
  setFoods(newFoodArray);
}
```
Calling .filter will return a new array based on which elements match our criteria in the callback function. 

##### Updating Elements in Array in State
One approach we can take to updating items in arrays by creating a new array involves using the .map method.  
Calling .map will return a new array with the same length as our original array (which is what we want), with some transformations applied to the elements in the array.  
Here's an example of using .map to update one element of an array:  
```jsx
[1, 2, 3].map((number) => {
  if (number === 3) {
    // if the number is the one we're looking for, increment it
    return number + 100;
  } else {
    // otherwise, return the original number
    return number;
  }
});
// => [1,2,103]
```
So to use that technique to solve our problem, here's how our click event handler would look:  
```jsx
function handleLiClick(id) {
  const newFoodArray = foods.map((food) => {
    if (food.id === id) {
      return {
        ...food,
        heatLevel: food.heatLevel + 1,
      };
    } else {
      return food;
    }
  });
  setFoods(newFoodArray);
}
```

##### Array Cheat Sheet
- **Add**: use the spread operator ([...])
- **Remove**: use .filter
- **Update**: use .map

### Working With Multiple State Variables
Sometimes, a component needs multiple state variables to represent multiple UI states.
```jsx
<select name="filter">
  <option value="All">All</option>
  <option value="American">American</option>
  <option value="Sichuan">Sichuan</option>
  <option value="Thai">Thai</option>
  <option value="Mexican">Mexican</option>
</select>
```
Let's set up our initial state to be a string of "All" to match the first ``<option>`` in our dropdown:
```jsx    
const [filterBy, setFilterBy] = useState("All");
```
With this state variable in place, we can update the ``<select>`` element to set the filterBy variable when its value is changed, like so:  
```jsx
function handleFilterChange(event) {
  setFilterBy(event.target.value);
}

return (
  <select name="filter" onChange={handleFilterChange}>
    <option value="All">All</option>
    <option value="American">American</option>
    <option value="Sichuan">Sichuan</option>
    <option value="Thai">Thai</option>
    <option value="Mexican">Mexican</option>
  </select>
);
```
Next, let's figure out how this filter value can be used to update what foods are displayed. We will need to use both of our state variables together to solve this problem! Here's how we can use the filter value to update which items are displayed:  
```jsx
const [foods, setFoods] = useState(spicyFoods);
const [filterBy, setFilterBy] = useState("All");

const foodsToDisplay = foods.filter((food) => {
  if (filterBy === "All") {
    return true;
  } else {
    return food.cuisine === filterBy;
  }
});
```
##### Lifting State
To decide which component to create our state variable in, we need to locate the closest common parent.
```
    App
    ├───Header
    └───PetCard
```


