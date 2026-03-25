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

