**React Testing Library:** a set of tools for loading React components in a test environment, finding DOM elements, and testing the user interface.   
It syncs well with the  React testing frameworks like *Vitest* and *Jest*.    
*Over the years, a number of frameworks for testing React have risen and fallen in terms of popularity. Recently, React Testing Library has become the most popular choice for testing React applications. One big reason for that is because helps guide developers to following best practices when testing by following this guiding principle: `The more your tests resemble the way your software is used, the more confidence they can give you.`*  
In contrast, some earlier popular testing libraries, like `Enzyme`, don't enforce best practices as strongly. Enzyme gives developers more tools for testing the implementation details of a React component (such as "what methods were called" and "how did state change"), which result in tests that are more brittle (it's harder to refactor a component, since you're testing the code rather than the output) and give you less confidence that the application is behaving the way a user would expect it to.  
In general, when testing user interfaces, the goal is to *test the application from the perspective of a user*.   
# Installation. 
```
npm install --save-dev @testing-library/react @testing-library/jest-dom 
```
# React Testing Library Sample.
```jsx
import  {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Test from "../Test"

describe("Test should be present", () => {
    it("Test must contain a h1 with a text Well Hello There", () => {
        //Arrange
        render(<Test/>)

        //Act
        const text = screen.getByText(/Well Hello there/i)

        //Assert
        expect(text).toBeInTheDocument()
    })
   
})
```
- **render**  method is used to render a React component inside the testing environment.  
Our Jest tests don't run in the browser, they run in Node, so one of the challenges of testing React components is that we need to simulate a browser environment within Node. Under the hood, the `JSDOM` library simulates a browser environment with browser-specific functionality, like the `document` object, which isn't available in Node. The `render` method then takes our React component and renders it in this simulated browser environment so we can check that it was rendered as expected.   
- **screen** method provides a way to interact with the simulated browser environment, namely by giving us a number of **query methods** to search the DOM for elements we expect to have been rendered (think of it like a supercharged version of document.querySelector).  

##### The TDD's Arrange-Act-Assert Methodology. 
- **Arrange** We render the Test component to the simulated browser environment so we can check what the component displays.   
- **Act** We use a query method (screen.getByText) to find a specific element that we expect to be displayed when the component is rendered. The /learn react/i syntax is a regular expression that will look for the text "learn react" anywhere on the screen. i is a flag for case-insensitive search, so it will match uppercase or lowercase characters.  
- **Assert** We use the expect method from Jest to check that the element is actually present in the document using a custom `Jest DOM` matcher `toBeInTheDocument`, which checks if the element is present in the simulated browser environment.  
Jest DOM is a custom library of matchers that help write assertions about DOM elements.   
# Running Tests.
For the case of CRA where React Testing React is pre-installed, modify the *test* scripts in `package.json`: 
```jsx
 "test": "react-scripts test"
```
Which will allow one to run using `npm t` or `npm test`.    
Otherwise, run using a test framework like Vitest or Jest.  
# Debugging Tools.
Running test is a bit of a challenge since we're not displaying anything and since the tests are running in Node, we can't use our usual UI debugging tools like the browser's developer tools to see what the DOM looks like.  
Using console.log in our tests results in uncomprehendable result: 
```jsx
test("renders learn react link", () => {
  render(<App />);

  const linkElement = screen.getByText(/learn react/i);

  console.log(linkElement);

  expect(linkElement).toBeInTheDocument();
});
```
returns: 
```jsx
HTMLAnchorElement {
  '__reactFiber$w022jamqt5l': FiberNode {
    tag: 5,
    key: null,
    elementType: 'a',
    type: 'a',
    stateNode: [Circular *1],
    return: FiberNode {...}
  }
}
```
React library provides a nice `debug` method to give us a sense of what the DOM looks like when our tests are running.  
```jsx
import  {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Test from "../Test"

describe("Test should be present", () => {
    it("Test must contain a h1 with a text Well Hello There", () => {
        render(<Test/>)
        screen.debug()
        const text = screen.getByText(/Well Hello there/i)
        
        expect(text).toBeInTheDocument()
    })
   
})
```
Now we can get a nice representation of what the DOM looks like when we run the tests.  
```jsx
    <body>
      <div>
        <h1>
          Well Hello There
        </h1>
      </div>
    </body>
```
We can also use this method to debug a single element:   
```jsx
import  {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Test from "../Test"

describe("Test should be present", () => {
    it("Test must contain a h1 with a text Well Hello There", () => {
        render(<Test/>)

        const text = screen.getByText(/Well Hello there/i)
        screen.debug(text)      //The line   

        expect(text).toBeInTheDocument()
    })
   
})
```
We can now see what the `text` looks like.  
```jsx
    <h1>
      Well Hello There
    </h1>
```
### Writing Accessible Applications.
When important consideration when designing websites is `accessibility` ~ making sure that as many users as possible can interact with your website, including folks with disabilities.    
Thankfully, React Testing Library makes accessibility a first-class citizen by providing query methods that help you find elements in accessible ways (the same ways that a screen reader would find the elements).   
while React Testing Library can help with accessibility, it isn't a silver bullet for accessibility; there are other considerations beyond what React Testing Library can tell us. For example, things like colors, contrast, and fonts also impact what users can use our applications.  
Tools like ``axe``, and `accessibility` features in ``Chrome's DevTools``, can help check for other accessibility issues as well.  

# QUERY METHODS(Accessible Queries).
For our previous example we had:
```jsx
const text = screen.getByText(/Well Hello There/i);
```
While this does give us confidence that there is some element with the text "Well Hello There" being rendered by our component, it doesn't give us much more information than that. What if we wanted to validate that the element in question is a button, or a link, or a heading? Those kinds of distinctions are important to make when designing a user interface; an `<a>` element has a different role to play in our application than a `<span>` does.  
The most preferred query method is the **byRole** method as it reflects the experience of both the visual/mouse users as well as the folks who use screen readers and other assistive technology.   
When using the byRole method, we can provide:  
- an `ARIA role` for the element we're looking for.
- optionally, text content that should be contained within the element  
For the case of: 
```jsx
<a href="https://youtube.com">Never Gonna Give You Up</a>
```
We can use this query: 
```jsx
const linkElement = screen.getByRole("link", {
    name: /never gonna give you up/i, 
})
```
**Anchor tags** (with an href)have an implicit ARIA role of "link" which is why this query works.  
You can also add an explicit ARIA role to any DOM element. 
```jsx
<span role="link" onClick={handleClick}>
    Billy Jean
</span>
```
The approach above should be avoided in general — it's best to use semantic HTML elements when possible rather than adding explicit roles, since semantic elements (like anchor tags) have additional built-in behavior (like making the browser navigate to a new page).  
##### Some of the common ARIA roles include: 
1. **`<h1>` to `<h6>`** - *heading*
2. **`<nav>`** - *navigation*
3. **`<ul>` || `<ol>`** - *list*. 
4. **`<button>`** - *button*
5. **`<table>`** - *table*.
6. **`<li>`** - *listitem*
7. **`<header>`** - *banner*
8. **`<header>`**
9. **`<footer>`**

### Identifying Accessible Roles. 
One challenge of testing user interfaces using accessible roles is that it can be difficult to remember what elements are associated with what roles.  
To view a list of the implicit ARIA roles rendered by a component, we can use the logRoles method. For example, given the following React component:  
```jsx 
function Test() {
    return (
        <>  
            <header>
            <h1>Well Hello There</h1>
            <a href="https://www.youtube.com">Never Gonna Give You Up</a>
            <button>Click Me!</button>
            </header>
        </>
    )
}
export default Test
```
We can set up a test that uses the **LogRoles** method.  
```jsx

//import the logRoles method.
import  {getRoles, logRoles, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Test from "../Test"

describe("Test should be present", () => {
    it("Test must contain a h1 with a text Well Hello There", () => {
        //Arrange
        render(<Test/>)

        //Act
        const text = screen.getByText(/Well Hello there/i)       

        //Assert
        expect(text).toBeInTheDocument()
    })
   
})
describe("QUERY METHODS (getByRole)", () => {
    it("Test has an <a> tag with the text \"never gonna give you up\"", () => {
        // "container" represents all the DOM elements rendered by our component.
        const {container} = render(<Test/>)

        //Prints out the accessible elements in our component along with their roles.    
        logRoles(container)

        const linkElement = screen.getByRole("link", {
            name: /never gonna give you up/i,
        })

        expect(linkElement).toBeInTheDocument()
    })
})
```
Result; 
```
    banner:
    
    Name "":
    <header />
    
    --------------------------------------------------
    heading:
    
    Name "Well Hello There":
    <h1 />
    
    --------------------------------------------------
    link:
    
    Name "Never Gonna Give You Up":
    <a
      href="https://www.youtube.com"
    />
    
    --------------------------------------------------
    button:
    
    Name "Click Me!":
    <button />
    
    --------------------------------------------------

```
`getByRole` accepts additional options: 
```jsx

    it("additional options by the (getByRole)", () => {
            render(<Test/>)

            const topLevelHeading = screen.getByRole("heading", {
                    name: /Well Hello There/i, 
                    exact: false,  //partial matches will be included.
                    level: 1  //We need this to be a top level (h1, not h2, h3...)
            }) 

            expect(topLevelHeading).toBeInTheDocument()
    })
```
This last step is a bit redundant, since `getByRole` `will throw an error` (and thus fail our test) if the element `isn't found`, but it's useful to use some kind of matcher to complete the story of our test and fully describe the behavior we're testing for.  
### Other Query Methods. 
In addition to the `byRole` method, RTL provides several other methods for finding elements , like **byAltText**( to find images by their alt text attribute.)   
The different Types of queries given are: 
1. **getBy...** either returns an element if one is found, or throws an error if not.  
2. **queryBy...** either returns an element if found, or `null` if not.  
3. **findBy...** asynchronously waits for an element to be present on the page.  
Each of them has an 'all' version (**getAllBy**, **queryAllBy**, **findAllBy**) useful when testing multiple elements and the threshold.  

### Jest DOM Matchers. 
We previously had the getByRole for the `<a>` tag, and ``toBeInTheDocument``as a Jest matcher provided by Jest DOM.  
Jest DOM also provides other matcher functions to check our DOM elements.  
For instance if we wanted to check that our link has the actual link to the correct URL, we would use the **toHaveAttribute** matcher. 
```jsx
it("The <a> tag link has the correct URL (toHaveAttribute)", () => {
            render(<Test/>)
            const linkElement = screen.getByRole("link", {name: /never gonna give you up/i})
            expect(linkElement).toHaveAttribute("href", "https://www.youtube.com")
    })
```
You can also still use regular Jest matchers like `toEqual` too!!!!!


# Working With Events.
To do this, we'll need to use the `user-event library` which allows us to simulate user events.  
##### Installation
```
npm install @testing-library/user-event
```
,,,,,,,


