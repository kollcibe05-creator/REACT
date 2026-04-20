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
