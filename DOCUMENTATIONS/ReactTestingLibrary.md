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
To start of, we'll use an ordering system for a pizza parlour.  
We'll allow users to chose either pizza or pepperoni  using a checkbox.    
We'll need to: 
- Verify that the the initial state of the page is what we want.  
- Simulate a user event.(in our case, clicking the checkbox.)  
- Verify that the state of the page updates as expected.  

To use the user-event simulation, we need to import the ``userEvent`` object first : 
```jsx
import userEvent from "@testing-library/user-event"
```
### Heads Up 
In modern versions of @testing-library/user-event `(v14+)`, all user interactions are `asynchronous`.   
If you don't `await` the click, your assertion expect(...).toBeChecked() runs before the component has finished re-rendering.  
Update the test to be async and await the user interaction.    
In `older` versions, userEvent.click() was `synchronous`, but it is now best practice(means it iss a convenction, the other method performs equivalently but pretty unreliable) to initialize the user session using `userEvent.setup()`.   
This ensures that all events (like focus and hover) are handled correctly.
```jsx
it("Toppings appear in the toppings list when checked.", async () => {    //async
        render(<Test/>)

        const user = userEvent.setup()   //user simulation setup. 

        const addPepperoni = screen.getByRole("checkbox", {name: /add pepperoni/i})

        await user.click(addPepperoni)   //await

        expect(addPepperoni).toBeChecked()

})
```
The fully implemented version: 
```jsx
describe("WORKING WITH EVENTS", () => {
    // 1. Test the initial state of the page
    it("Pizza checkbox is initially unchecked", () => {
        render(<Test/>)
        const addPepperoni = screen.getByRole("checkbox", {name: /add pepperoni/i})
        expect(addPepperoni).not.toBeChecked()

        // "toppings list should initially contain only cheese."
        expect(screen.getAllByRole("listitem").length).toBe(1)
        
        // "Also verify the text content to be matching"  
        expect(screen.getByText("Cheese")).toBeInTheDocument();

        // "Also assert that pepperoni is not in the document"
        expect(screen.queryByText("pepperoni")).not.toBeInTheDocument()
        
    })  

    // 2. Test the effect of clicking the checkbox. 
    it("Toppings appear in the toppings list when checked.", async () => {
        render(<Test/>)
        const user = userEvent.setup()
        // Checkboxes become checked when the user clicks them.
        const addPepperoni = screen.getByRole("checkbox", {name: /add pepperoni/i})

        await user.click(addPepperoni)

        expect(addPepperoni).toBeChecked()

        //Toppings is in the toppings list when checked.
        expect(screen.getByText("Cheese")).toBeInTheDocument();
        expect(screen.queryByText("Pepperoni")).toBeInTheDocument()

        //``````````````````NOTE``````````````````````
        // In modern versions of @testing-library/user-event (v14+), all user interactions are asynchronous. If you don't await the click, your assertion expect(...).toBeChecked() runs before the component has finished re-rendering.
        // Update your test to be async and await the user interaction.
        // In older versions, userEvent.click() was synchronous, but it is now best practice to initialize the user session using userEvent.setup(). This ensures that all events (like focus and hover) are handled correctly.


    })
    // 3. Test the effect of clicking the checkbox a second time. 
    it("Selected toppings disappear when checked a second time.", () => {
        render(<Test/>)
        const addPepperoni = screen.getByRole("checkbox", {name: /add pepperoni/i})
        userEvent.click(addPepperoni)

        expect(screen.getByText("Cheese")).toBeInTheDocument();
        expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument()

        userEvent.click(addPepperoni)

        expect(screen.getByText("Cheese")).toBeInTheDocument();
        expect(screen.queryByText("pepperoni")).not.toBeInTheDocument()

    })
})
```

# Testing Forms
Still on our pizza restaraunt, besides toppings-selection functionality, there is a lot of details that the user needs to fill like what pizza size, contact info....  
We'll walk through this step by step:  
### Select the Pizza Size
This will require use of the `select` element.  
When using an input element, it is important to include the label for accessibility purposes.  
This then will allow us to use the `getByLabelText` query to find it.   
We want to setup our default option to be 'Small'.  
```jsx
test("size selected should initially be \Small\"", () => {
    render(<Test/>)
    const selectSize = screen.getByLabelText(/select size/i)
    expect(selectSize).toHaveDisplayValue("Small")
})
```
Then our input which we'll fixate it into the form will take the structure:
```jsx
<form>
  {/*rest...*/}
  <div>
    <h3>Size</h3>
    <label htmlFor="select-size">Select size: </label>
    <select id="select-size" value={size} onChange={selectSize}>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
    </select>
  </div>
</form>
```
Also update the state of it: 

```jsx
const [size, setSize] = useState("small");
const selectSize = (e) => setSize(e.target.value);
```
We will also have to verify that display updates when the user selects a different size.    
To achieve this we'll simulate the user action by calling ``userEvent.selectOptions`` and passing two args: `selectSize callback function` and the value to select.  
```jsx
it("Select size dropdown displays the user's selected value", () => {
    const selectSize = screen.getByLabelText(/Select Size/i)

    userEvent.selectOptions(selectSize, "medium")
    expect(selectSize).toHaveDisplayValue("Medium")

    userEvent.selectOptions(selectSize, "large")
    expect(selectSize).toHaveDisplayValue("large")
})
```
### Display Selections on the Page
We have to assert that the user's selection is displayes on the page. Because our defaults are "small cheese" and "small", we expect our initial state of the page to be similar.  
We're simply displaying something to the screen, *getByText* will do.  
```jsx
test("'Your Selection' message initially displays 'small cheese'", () => {
  render(<App />);

  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});
```
Finally we want to verify that the message on the screen updates when the user changes either the size or the toppings.  
```jsx
    render(<App/>)
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    const selectSize = screen.getByLabelText(/select size/i);

    useEvent.click(addPepperoni)

    expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument()

    useEvent.selectOptions(selectSize, "large")

    expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument()

```
### Enter the Contact Info.
Next we'll add a text box to allow our customers to enter their contact info.  
We want to verify that the text box has "email address" as placeholder text.   
```jsx
test("'Contact Info' text box initially displays a placeholder value of 'email address'", () => {
  render(<App />);

  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});
```
As with our checkbox and dropdown menu, we'll add a label to our text box for accessibility and set it up as a controlled input in the form:   
```jsx
const [contactInfo, setContactInfo] = useState("");
const updateContactField = (e) => setContactInfo(e.target.value);

return (
  <div>
    <h1>Place an Order</h1>
    <p>
      Your selection: {size} {pepperoniIsChecked ? "pepperoni" : "cheese"}
    </p>
    <form>
      {/*... rest*/}
      <div>
        <h3>Contact Info</h3>
        <label htmlFor="email">Enter your email address: </label>
        <input
          type="text"
          value={contactInfo}
          id="email"
          placeholder="email address"
          onChange={updateContactField}
        />
      </div>
    </form>
  </div>
);
```
We then have to simulate the user typing into the inputs and verify that the value of the input is what is being typed.  
For that, we will have to use  ``userEvent.type`` to simulate the user typing in a value.  
```jsx
test("the page shows info the user types into the contact form field.", () => {
    const contact = screen.getByLabelText(/enter your email address/i)

    userEvent.type(contact, "pizzafan@gmail.com")

    expect(contact).toHaveValue("pizzafan@gmail.com")
})
```

### Submit the Order
We'll start by testing that the button exists on the page.  
 We can use *getByRole* to find the button and *toBeInTheDocument* to verify that it's on the page:  
```jsx
test("form contains a `Submit Order` button", () => {
    render(<App/>)

    expect(
        screen.getByRole("button", {name: /submit order/i})
    ).toBeInTheDocument()
})
```
When the user submits the order, we want to display a message:  
To get this passing, we'll keep track of the order submission status in state, and create a submitOrder callback function:  
```jsx
const [orderIsSubmitted, setOrderIsSubmitted] = useState(false);
const submitOrder = (e) => {
  e.preventDefault();
  setOrderIsSubmitted(true);
};
```
We'll then add an onSubmit attribute to our form that will call submitOrder, and use a ternary to conditionally render the message if the order has been submitted:  

```jsx
<form onSubmit={submitOrder}>{/*...rest of form*/}</form>;
{
  orderIsSubmitted ? <h2>Thanks for your order!</h2> : null;
}
```
# Testing Library Matchers. 
#### Overview
Queries are the methods that Testing Library gives to find elements on the page.  
There are several types of queries and the only difference is whether the query will throw an error if element is found or if it will return a Promise and retry.  
##### Types of queries
###### Single elements
- **getBy...** Returns the matching node for a query, and `throw a descriptive error` if no elements match or if more than one match is found.    
- **queryBy...** Returns the matching node for a query, and return `null` if no elements match. This is useful for asserting an element that is not present. Throws an `error` if `more than one match` is found.  
- **findBy...** Returns a `Promise` which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a `default timeout` of `1000ms`.  
###### Multiple elements
- **getAllBy...** Returns an `array` of `all matching nodes` for a query, and throws an `error` if no elements match.  
- **queryAllBy...** Returns an `array` of all matching nodes for a query, and return an `empty array ([])` if no elements match.  
- **findAllBy...** Returns a `promise` which resolves to an array of elements when any elements are found which match the given query. The promise is rejected if no elements are found after a default timeout of `1000ms`.    
findBy methods are a combination of `getBy*` queries and `waitFor`. They accept the `waitFor` options as the last argument (i.e. ``await screen.findByText('text', queryOptions, waitForOptions)``)
```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
Type of Query	    | 0 Matches	        | 1 Match	        | >1 Matches	        | Retry (Async/Await)   |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
Single Element				                                                                                |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
getBy...	        | Throw error	    | Return element	| Throw error	        | No                    |
queryBy...	        | Return null	    | Return element	| Throw error	        | No                    |
findBy...	        | Throw error	    | Return element	| Throw error	        | Yes                   |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
Multiple Elements	                                                                                        |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
getAllBy...	        | Throw error	    | Return array	    | Return array	        | No                    |
queryAllBy...	    | []	            | Return array	    | Return array	        | No                    |
findAllBy...	    | Throw error	    | Return array	    | Return array	        | Yes                   |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
```
#### A Note on Priorities. 
Based on the guiding principles, the test should resemble how users interact with one's code as much as possible.  
With this in mind, the recommended order is:  
##### 1. Queries Accessible to Everyone.  
Queries that reflect the experience of visual/mouse users as well as those that use assistive technology.  
1. **getByRole**  This can be used to query every element that is exposed in the accessibility tree. With the `name` option you can filter the returned elements by their accessible name. This should be your top preference for just about everything. There's not much you can't get with this (if you can't, it's possible your UI is inaccessible). Most often, this will be used with the name option.  
2. **getByLabelText** This method is really good for form fields. When navigating through a website form, users find elements using label text. This method emulates that behavior, so it should be your top preference.  
3. **getByPlaceholderText** A placeholder is not a substitute for a label. But if that's all you have, then it's better than alternatives.  
4. **getByText** Outside of forms, text content is the main way users find elements. This method can be used to find non-interactive elements (like divs, spans, and paragraphs).  
5. **getByDisplayValue** The current value of a form element can be useful when navigating a page with filled-in values.    
##### 2. Semantic Queries
HTML5 and ARIA compliant selectors. Note that the user experience of interacting with these attributes varies greatly across browsers and assistive technology.
1. **getByAltText** If your element is one which supports *alt* text (img, area, input, and any custom element), then you can use this to find that element.  
2. **getByTitle** The title attribute is not consistently read by screenreaders, and is not visible by default for sighted users.  
##### 3. Test IDs
1. **getByTestId** The user cannot see (or hear) these, so this is only recommended for cases where you can't match by role or text or it doesn't make sense (e.g. the text is dynamic).  

## Cheat Sheet
###### **ByLabelText** find by label or aria-label text content
- getByLabelText
- queryByLabelText
- getAllByLabelText
- queryAllByLabelText
- findByLabelText
- findAllByLabelText
###### **ByPlaceholderText** find by input placeholder value
- getByPlaceholderText
- queryByPlaceholderText
- getAllByPlaceholderText
- queryAllByPlaceholderText
- findByPlaceholderText
- findAllByPlaceholderText
###### **ByText** find by element text content
- getByText
- queryByText
- getAllByText
- queryAllByText
- findByText
- findAllByText
###### **ByDisplayValue** find by form element current value
- getByDisplayValue
- queryByDisplayValue
- getAllByDisplayValue
- queryAllByDisplayValue
- findByDisplayValue
- findAllByDisplayValue
###### **ByAltText** find by img alt attribute
- getByAltText
- queryByAltText
- getAllByAltText
- queryAllByAltText
- findByAltText
- findAllByAltText
###### **ByTitle** find by title attribute or svg title tag
- getByTitle
- queryByTitle
- getAllByTitle
- queryAllByTitle
- findByTitle
- findAllByTitle
###### **ByRole** find by aria role
- getByRole
- queryByRole
- getAllByRole
- queryAllByRole
- findByRole
- findAllByRole
###### **ByTestId** find by data-testid attribute
- getByTestId
- queryByTestId
- getAllByTestId
- queryAllByTestId
- findByTestId
- findAllByTestId

# JEST DOM Matchers. 
- toBeDisabled
- toBeEnabled
- toBeEmptyDOMElement
- toBeInTheDocument
- toBeInvalid
- toBeDisabled
- toBeRequired
- toBeValid
- toBeVisible
- toContainElement
- toContainHTML
- toHaveAccessibleErrorMessage
- toHaveAccessibleName
- toHaveAttribute
- toHaveClass
- toHaveFocus
- toHaveFormValues
- toHaveStyle
- toHaveTextContent
- toHaveValue
- toHaveDisplayValue
- toBeChecked
- toBePartiallyChecked
- toHaveRole
- toHaveErrorMessage
- toBePressed
- toBePressed
- toBePartiallyPressed
- toAppearBefore
- toAppearAfter
  
###### Deprecated  
- toBeEmpty
- toBeInTheDOM
- toHaveDescription
- toHaveSelection

### Usage
###### **toBeDisabled``**
According to the usage, the dom elements that can be disabled include: **`button, input, select, textarea, optgroup, option, fieldset, and custom elements.`**  
It will also consider the element as disabled if it's inside a parent form element that supports being `disabled` and has the disabled attribute present.  
```jsx
<button data-testid="button" type="submit" disabled>submit</button>
<fieldset disabled><input type="text" data-testid="input" /></fieldset>
<a href="..." disabled>link</a>
```
```jsx
expect(getByTestId('button')).toBeDisabled()
expect(getByTestId('input')).toBeDisabled()
expect(getByText('link')).not.toBeDisabled()
```
This custom matcher does not take into account the presence or absence of the `aria-disabled` attribute. 
###### **toBeEnabled``**
Similar to `.not.toBeDisabled()`.  
Use it to avoid double negation.  
###### **toBeEmptyDOMElement``**
This allows you to assert whether an element has no visible content for the user.  
It ignores comments but will fail if the element contains `white-space`.

```jsx
<span data-testid="not-empty"><span data-testid="empty"></span></span>
<span data-testid="with-whitespace"> </span>
<span data-testid="with-comment"><!-- comment --></span>
```
```jsx
expect(getByTestId('empty')).toBeEmptyDOMElement()
expect(getByTestId('not-empty')).not.toBeEmptyDOMElement()
expect(getByTestId('with-whitespace')).not.toBeEmptyDOMElement()
```
###### **toBeInvalid``**
This allows you to check if an element, is currently invalid.  
An element is `invalid` if it has an `aria-invalid attribute` with no value or a value of `"true"`, or if the result of `checkValidity()` is `false`.  
```jsx
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />

<form data-testid="valid-form">
  <input />
</form>

<form data-testid="invalid-form">
  <input required />
</form>
```
```jsx
expect(getByTestId('no-aria-invalid')).not.toBeInvalid()
expect(getByTestId('aria-invalid')).toBeInvalid()
expect(getByTestId('aria-invalid-value')).toBeInvalid()
expect(getByTestId('aria-invalid-false')).not.toBeInvalid()

expect(getByTestId('valid-form')).not.toBeInvalid()
expect(getByTestId('invalid-form')).toBeInvalid()
```
###### **toBeInTheDocument``**
```jsx
<span data-testid="html-element"><span>Html Element</span></span>
<svg data-testid="svg-element"></svg>
```
```jsx
expect(
  getByTestId(document.documentElement, 'html-element'),
).toBeInTheDocument()
expect(getByTestId(document.documentElement, 'svg-element')).toBeInTheDocument()
expect(
  queryByTestId(document.documentElement, 'does-not-exist'),
).not.toBeInTheDocument()
```
This matcher does not find detached elements. The element must be added to the document to be found by toBeInTheDocument. If you desire to search in a detached element please use: ``toContainElement``.    
###### **toBeRequired``**
This allows you to check if a form element is currently required.  
An element is required if it is having a `required` or `aria-required="true"` attribute.   
```jsx
<input data-testid="required-input" required />
<input data-testid="aria-required-input" aria-required="true" />
<input data-testid="conflicted-input" required aria-required="false" />
<input data-testid="aria-not-required-input" aria-required="false" />
<input data-testid="optional-input" />
<input data-testid="unsupported-type" type="image" required />
<select data-testid="select" required></select>
<textarea data-testid="textarea" required></textarea>
<div data-testid="supported-role" role="tree" required></div>
<div data-testid="supported-role-aria" role="tree" aria-required="true"></div>
```
```jsx
expect(getByTestId('required-input')).toBeRequired()
expect(getByTestId('aria-required-input')).toBeRequired()
expect(getByTestId('conflicted-input')).toBeRequired()
expect(getByTestId('aria-not-required-input')).not.toBeRequired()
expect(getByTestId('optional-input')).not.toBeRequired()
expect(getByTestId('unsupported-type')).not.toBeRequired()
expect(getByTestId('select')).toBeRequired()
expect(getByTestId('textarea')).toBeRequired()
expect(getByTestId('supported-role')).not.toBeRequired()
expect(getByTestId('supported-role-aria')).toBeRequired()
```
###### **toBeValid``**
An element is valid if it has `no aria-invalid attributes` or an `attribute value of "false"`.  
The result of `checkValidity()` must also be `true` if it's a `form element`.  
```jsx
<input data-testid="no-aria-invalid" />
<input data-testid="aria-invalid" aria-invalid />
<input data-testid="aria-invalid-value" aria-invalid="true" />
<input data-testid="aria-invalid-false" aria-invalid="false" />

<form data-testid="valid-form">
  <input />
</form>

<form data-testid="invalid-form">
  <input required />
</form>
```
```jsx
expect(getByTestId('no-aria-invalid')).toBeValid()
expect(getByTestId('aria-invalid')).not.toBeValid()
expect(getByTestId('aria-invalid-value')).not.toBeValid()
expect(getByTestId('aria-invalid-false')).toBeValid()

expect(getByTestId('valid-form')).toBeValid()
expect(getByTestId('invalid-form')).not.toBeValid()
```
###### **toBeVisible``**
This allows you to check if an element is currently visible to the user.  
An element is visible if all the following conditions are met:  
- it is present in the document
- it does not have its css property `display` set to `none`
- it does not have its css property `visibility` set to either `hidden` or `collapse`
- it does not have its css property `opacity` set to `0`
- its parent element is also visible (and so on up to the top of the DOM tree)
- it does not have the `hidden` attribute
- if `<details />` it has the `open` attribute  
```jsx
<div data-testid="zero-opacity" style="opacity: 0">Zero Opacity Example</div>
<div data-testid="visibility-hidden" style="visibility: hidden">
  Visibility Hidden Example
</div>
<div data-testid="display-none" style="display: none">Display None Example</div>
<div style="opacity: 0">
  <span data-testid="hidden-parent">Hidden Parent Example</span>
</div>
<div data-testid="visible">Visible Example</div>
<div data-testid="hidden-attribute" hidden>Hidden Attribute Example</div>
<details>
  <summary>Title of hidden text</summary>
  Hidden Details Example
</details>
<details open>
  <summary>Title of visible text</summary>
  <div>Visible Details Example</div>
</details>
```
```jsx
expect(getByText('Zero Opacity Example')).not.toBeVisible()
expect(getByText('Visibility Hidden Example')).not.toBeVisible()
expect(getByText('Display None Example')).not.toBeVisible()
expect(getByText('Hidden Parent Example')).not.toBeVisible()
expect(getByText('Visible Example')).toBeVisible()
expect(getByText('Hidden Attribute Example')).not.toBeVisible()
expect(getByText('Hidden Details Example')).not.toBeVisible()
expect(getByText('Visible Details Example')).toBeVisible()
```
###### **toContainElement``**
```jsx
toContainElement(element: HTMLElement | SVGElement | null)
```
This allows you to assert whether an element contains another element as a descendant or not.  
```jsx
<span data-testid="ancestor"><span data-testid="descendant"></span></span>
```
```jsx
const ancestor = getByTestId('ancestor')
const descendant = getByTestId('descendant')
const nonExistantElement = getByTestId('does-not-exist')

expect(ancestor).toContainElement(descendant)
expect(descendant).not.toContainElement(ancestor)
expect(ancestor).not.toContainElement(nonExistantElement)
```
###### **toContainHTML``**
```jsx
toContainHTML(htmlText: string)
```
Assert whether a string representing a HTML element is contained in another element. The string should contain valid html, and not any incomplete html.   
```jsx
<span data-testid="parent"><span data-testid="child"></span></span>
```
```jsx
// These are valid uses
expect(getByTestId('parent')).toContainHTML('<span data-testid="child"></span>')
expect(getByTestId('parent')).toContainHTML('<span data-testid="child" />')
expect(getByTestId('parent')).not.toContainHTML('<br />')

// These won't work
expect(getByTestId('parent')).toContainHTML('data-testid="child"')
expect(getByTestId('parent')).toContainHTML('data-testid')
expect(getByTestId('parent')).toContainHTML('</span>')
```
Chances are you probably do not need to use this matcher. We encourage testing from the perspective of how the user perceives the app in a browser. That's why testing against a specific DOM structure is not advised.  
It could be useful in situations where the code being tested renders html that was obtained from an external source, and you want to validate that that html code was used as intended.  
It should not be used to check DOM structure that you control. Use  `toContainElement` instead.  
###### **toHaveAccessibleDescription``**
```jsx
toHaveAccessibleDescription(expectedAccessibleDescription?: string | RegExp)
```
This allows you to assert that an element has the expected accessible description.  
You can pass the exact string of the expected accessible description, or you can make a partial match passing a regular expression, or by using `expect.stringContaining/expect.stringMatching`.   
```jsx
<a
  data-testid="link"
  href="/"
  aria-label="Home page"
  title="A link to start over"
  >Start</a
>
<a data-testid="extra-link" href="/about" aria-label="About page">About</a>
<img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
<img
  src="logo.jpg"
  data-testid="logo"
  alt="Company logo"
  aria-describedby="t1"
/>
<span id="t1" role="presentation">The logo of Our Company</span>
<img
  src="logo.jpg"
  data-testid="logo2"
  alt="Company logo"
  aria-description="The logo of Our Company"
/>
```
```jsx
expect(getByTestId('link')).toHaveAccessibleDescription()
expect(getByTestId('link')).toHaveAccessibleDescription('A link to start over')
expect(getByTestId('link')).not.toHaveAccessibleDescription('Home page')
expect(getByTestId('extra-link')).not.toHaveAccessibleDescription()
expect(getByTestId('avatar')).not.toHaveAccessibleDescription()
expect(getByTestId('logo')).not.toHaveAccessibleDescription('Company logo')
expect(getByTestId('logo')).toHaveAccessibleDescription(
  'The logo of Our Company',
)
expect(getByTestId('logo2')).toHaveAccessibleDescription(
  'The logo of Our Company',
)
```
###### **toHaveAccessibleErrorMessage``**
```jsx
toHaveAccessibleErrorMessage(expectedAccessibleErrorMessage?: string | RegExp)
```
This allows you to assert that an element has the expected accessible error message.  
You can pass the exact string of the expected accessible error message. Alternatively, you can perform a partial match by passing a regular expression or by using `expect.stringContaining/expect.stringMatching`.  
```jsx
<input
  aria-label="Has Error"
  aria-invalid="true"
  aria-errormessage="error-message"
/>
<div id="error-message" role="alert">This field is invalid</div>

<input aria-label="No Error Attributes" />
<input
  aria-label="Not Invalid"
  aria-invalid="false"
  aria-errormessage="error-message"
/>
```
```jsx
<input
  aria-label="Has Error"
  aria-invalid="true"
  aria-errormessage="error-message"
/>
<div id="error-message" role="alert">This field is invalid</div>

<input aria-label="No Error Attributes" />
<input
  aria-label="Not Invalid"
  aria-invalid="false"
  aria-errormessage="error-message"
/>
```
```jsx
// Inputs with Valid Error Messages
expect(getByRole('textbox', {name: 'Has Error'})).toHaveAccessibleErrorMessage()
expect(getByRole('textbox', {name: 'Has Error'})).toHaveAccessibleErrorMessage(
  'This field is invalid',
)
expect(getByRole('textbox', {name: 'Has Error'})).toHaveAccessibleErrorMessage(
  /invalid/i,
)
expect(
  getByRole('textbox', {name: 'Has Error'}),
).not.toHaveAccessibleErrorMessage('This field is absolutely correct!')

// Inputs without Valid Error Messages
expect(
  getByRole('textbox', {name: 'No Error Attributes'}),
).not.toHaveAccessibleErrorMessage()

expect(
  getByRole('textbox', {name: 'Not Invalid'}),
).not.toHaveAccessibleErrorMessage()
```
###### **toHaveAccessibleName``**
```jsx
toHaveAccessibleName(expectedAccessibleName?: string | RegExp)
```
This allows you to assert that an element has the expected accessible name. It is useful, for instance, to assert that form elements and buttons are properly labelled.  
You can pass the exact string of the expected accessible name, or you can make a partial match passing a regular expression, or by using `expect.stringContaining/expect.stringMatching`.  
```jsx
<img data-testid="img-alt" src="" alt="Test alt" />
<img data-testid="img-empty-alt" src="" alt="" />
<svg data-testid="svg-title"><title>Test title</title></svg>
<button data-testid="button-img-alt"><img src="" alt="Test" /></button>
<p><img data-testid="img-paragraph" src="" alt="" /> Test content</p>
<button data-testid="svg-button"><svg><title>Test</title></svg></p>
<div><svg data-testid="svg-without-title"></svg></div>
<input data-testid="input-title" title="test" />
```
```jsx
expect(getByTestId('img-alt')).toHaveAccessibleName('Test alt')
expect(getByTestId('img-empty-alt')).not.toHaveAccessibleName()
expect(getByTestId('svg-title')).toHaveAccessibleName('Test title')
expect(getByTestId('button-img-alt')).toHaveAccessibleName()
expect(getByTestId('img-paragraph')).not.toHaveAccessibleName()
expect(getByTestId('svg-button')).toHaveAccessibleName()
expect(getByTestId('svg-without-title')).not.toHaveAccessibleName()
expect(getByTestId('input-title')).toHaveAccessibleName()
```
###### **toHaveAttribute``**
```jsx
toHaveAttribute(attr: string, value?: any)
```
This allows you to check whether the given element has an attribute or not.  
You can also optionally check that the attribute has a specific expected value or partial match using `expect.stringContaining/expect.stringMatching`  
```jsx
<button data-testid="ok-button" type="submit" disabled>ok</button>
```
```jsx
const button = getByTestId('ok-button')

expect(button).toHaveAttribute('disabled')
expect(button).toHaveAttribute('type', 'submit')
expect(button).not.toHaveAttribute('type', 'button')

expect(button).toHaveAttribute('type', expect.stringContaining('sub'))
expect(button).toHaveAttribute('type', expect.not.stringContaining('but'))
```
###### **toHaveClass``**
```jsx
toHaveClass(...classNames: string[], options?: {exact: boolean})
```
This allows you to check whether the given element has certain classes within its class attribute. You must provide at least one class, unless you are asserting that an element does not have any classes.  
The list of class names may include strings and regular expressions. Regular expressions are matched against each individual class in the target element, and it is NOT matched against its full class attribute value as whole.  
```jsx
<button data-testid="delete-button" class="btn extra btn-danger">
  Delete item
</button>
<button data-testid="no-classes">No Classes</button>
```
```jsx
const deleteButton = getByTestId('delete-button')
const noClasses = getByTestId('no-classes')

expect(deleteButton).toHaveClass('extra')
expect(deleteButton).toHaveClass('btn-danger btn')
expect(deleteButton).toHaveClass(/danger/, 'btn')
expect(deleteButton).toHaveClass('btn-danger', 'btn')
expect(deleteButton).not.toHaveClass('btn-link')
expect(deleteButton).not.toHaveClass(/link/)
expect(deleteButton).not.toHaveClass(/btn extra/) // It does not match

expect(deleteButton).toHaveClass('btn-danger extra btn', {exact: true}) // to check if the element has EXACTLY a set of classes
expect(deleteButton).not.toHaveClass('btn-danger extra', {exact: true}) // if it has more than expected it is going to fail

expect(noClasses).not.toHaveClass()
```
###### **toHaveFocus`**
```jsx
<div><input type="text" data-testid="element-to-focus" /></div>
```
```jsx
const input = getByTestId('element-to-focus')

input.focus()
expect(input).toHaveFocus()

input.blur()
expect(input).not.toHaveFocus()
```
###### **toHaveFormValues``**
```jsx
toHaveFormValues(expectedValues: {
  [name: string]: any
})
```
This allows you to check if a form or fieldset contains form controls for each given name, and having the specified value.  
It is important to stress that this matcher can only be invoked on a form or a fieldset element.  
This allows it to take advantage of the *.elements* property in form and fieldset to reliably fetch all form controls within them.   
This also avoids the possibility that users provide a container that contains more than one form, thereby intermixing form controls that are not related, and could even conflict with one another.  
This matcher abstracts away the particularities with which a form control value is obtained depending on the type of form control. For instance, `<input>` elements have a value attribute, but `<select>` elements do not.   
Here's a list of all cases covered:
- **`<input type="number">`**  elements return the value as a number, instead of a string.
- **`<input type="checkbox">`**   
if there's a single one with the given name attribute, it is treated as a boolean, returning true if the checkbox is checked, false if unchecked.  
if there's more than one checkbox with the same name attribute, they are all treated collectively as a single form control, which returns the value as an array containing all the values of the selected checkboxes in the collection.  
- **`<input type="radio">`** elements are all grouped by the name attribute, and such a group treated as a single form control. This form control returns the value as a string corresponding to the value attribute of the selected radio button within the group.    
- **`<input type="text">`** elements return the value as a string. This also applies to <input> elements having any other possible type attribute that's not explicitly covered in different rules above (e.g. search, email, date, password, hidden, etc.)  
- **`<select> without multiple attribute`** return the value as a string corresponding to the value attribute of the selected option, or undefined if there's no selected option.  
- **`<select multiple>`** elements return the value as an array containing all the values of the selected options.
- **`<textarea>`**  elements return their value as a string. The value corresponds to their node content.  
The above rules make it easy, for instance, to switch from using a single select control to using a group of radio buttons. Or to switch from a multi select control, to using a group of checkboxes. The resulting set of form values used by this matcher to compare against would be the same.  
```jsx
<form data-testid="login-form">
  <input type="text" name="username" value="jane.doe" />
  <input type="password" name="password" value="12345678" />
  <input type="checkbox" name="rememberMe" checked />
  <button type="submit">Sign in</button>
</form>
```
```jsx
expect(getByTestId('login-form')).toHaveFormValues({
  username: 'jane.doe',
  rememberMe: true,
})
```
###### **toHaveStyle``**
```jsx
toHaveStyle(css: string | object)
```
This allows you to check if a certain element has some specific css properties with specific values applied. It matches only if the element has *all* the expected properties applied, not just some of them  
```jsx
<button
  data-testid="delete-button"
  style="display: none; background-color: red"
>
  Delete item
</button>
```
```jsx
const button = getByTestId('delete-button')

expect(button).toHaveStyle('display: none')
expect(button).toHaveStyle({display: 'none'})
expect(button).toHaveStyle(`
  background-color: red;
  display: none;
`)
expect(button).toHaveStyle({
  backgroundColor: 'red',
  display: 'none',
})
expect(button).not.toHaveStyle(`
  background-color: blue;
  display: none;
`)
expect(button).not.toHaveStyle({
  backgroundColor: 'blue',
  display: 'none',
})
```
This also works with rules that are applied to the element via a class name for which some rules are defined in a stylesheet currently active in the document. The usual rules of css precedence apply.  

###### **toHaveTextContent``**
```jsx
toHaveTextContent(text: string | RegExp, options?: {normalizeWhitespace: boolean})
```
This supports elements, but also text nodes and fragments.  
When a string argument is passed through, it will perform a partial case-sensitive match to the node content.  
To perform a case-insensitive match, you can use a RegExp with the /i modifier.  
If you want to match the whole content, you can use a RegExp to do it.  
```jsx
<span data-testid="text-content">Text Content</span>
``` 
```jsx
const element = getByTestId('text-content')

expect(element).toHaveTextContent('Content')
expect(element).toHaveTextContent(/^Text Content$/) // to match the whole content
expect(element).toHaveTextContent(/content$/i) // to use case-insensitive match
expect(element).not.toHaveTextContent('content')
```
###### **toHaveValue``**
```jsx
toHaveValue(value: string | string[] | number)
```
This allows you to check whether the given form element has the specified value. It accepts `<input>, <select> and <textarea>` elements with the exception of `<input type="checkbox">` and `<input type="radio">`, which can be meaningfully matched only using ``toBeChecked`` or ``toHaveFormValues``.  
It also accepts elements with roles `meter, progressbar, slider or spinbutton` and checks their `aria-valuenow` attribute (as a number).  
```jsx
<input type="text" value="text" data-testid="input-text" />
<input type="number" value="5" data-testid="input-number" />
<input type="text" data-testid="input-empty" />
<select multiple data-testid="select-number">
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third" selected>Third Value</option>
</select>
```
```jsx
const textInput = getByTestId('input-text')
const numberInput = getByTestId('input-number')
const emptyInput = getByTestId('input-empty')
const selectInput = getByTestId('select-number')

expect(textInput).toHaveValue('text')
expect(numberInput).toHaveValue(5)
expect(emptyInput).not.toHaveValue()
expect(selectInput).toHaveValue(['second', 'third'])
```
###### **toHaveDisplayValue``**
```jsx
toHaveDisplayValue(value: string | RegExp | (string|RegExp)[])
```
This allows you to check whether the given form element has the specified displayed value (the one the end user will see). It accepts `<input>, <select> and <textarea>` elements with the exception of `<input type="checkbox"> and <input type="radio">`, which can be meaningfully matched only using ``toBeChecked`` or ``toHaveFormValues``.  
```jsx
<label for="input-example">First name</label>
<input type="text" id="input-example" value="Luca" />

<label for="textarea-example">Description</label>
<textarea id="textarea-example">An example description here.</textarea>

<label for="single-select-example">Fruit</label>
<select id="single-select-example">
  <option value="">Select a fruit...</option>
  <option value="banana">Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado">Avocado</option>
</select>

<label for="multiple-select-example">Fruits</label>
<select id="multiple-select-example" multiple>
  <option value="">Select a fruit...</option>
  <option value="banana" selected>Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado" selected>Avocado</option>
</select>
```
```jsx
const input = screen.getByLabelText('First name')
const textarea = screen.getByLabelText('Description')
const selectSingle = screen.getByLabelText('Fruit')
const selectMultiple = screen.getByLabelText('Fruits')

expect(input).toHaveDisplayValue('Luca')
expect(input).toHaveDisplayValue(/Luc/)
expect(textarea).toHaveDisplayValue('An example description here.')
expect(textarea).toHaveDisplayValue(/example/)
expect(selectSingle).toHaveDisplayValue('Select a fruit...')
expect(selectSingle).toHaveDisplayValue(/Select/)
expect(selectMultiple).toHaveDisplayValue([/Avocado/, 'Banana'])
```
###### **toBeChecked``**
 It accepts an input of type `checkbox` or `radio` and elements with a role of `checkbox, radio or switch` with a `valid aria-checked` attribute of `"true"` or `"false"`.  
```jsx
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>

<input type="radio" checked value="foo" data-testid="input-radio-checked" />
<input type="radio" value="foo" data-testid="input-radio-unchecked" />
<div role="radio" aria-checked="true" data-testid="aria-radio-checked" />
<div role="radio" aria-checked="false" data-testid="aria-radio-unchecked" />
<div role="switch" aria-checked="true" data-testid="aria-switch-checked" />
<div role="switch" aria-checked="false" data-testid="aria-switch-unchecked" />
```
```jsx
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
expect(inputCheckboxChecked).toBeChecked()
expect(inputCheckboxUnchecked).not.toBeChecked()
expect(ariaCheckboxChecked).toBeChecked()
expect(ariaCheckboxUnchecked).not.toBeChecked()

const inputRadioChecked = getByTestId('input-radio-checked')
const inputRadioUnchecked = getByTestId('input-radio-unchecked')
const ariaRadioChecked = getByTestId('aria-radio-checked')
const ariaRadioUnchecked = getByTestId('aria-radio-unchecked')
expect(inputRadioChecked).toBeChecked()
expect(inputRadioUnchecked).not.toBeChecked()
expect(ariaRadioChecked).toBeChecked()
expect(ariaRadioUnchecked).not.toBeChecked()

const ariaSwitchChecked = getByTestId('aria-switch-checked')
const ariaSwitchUnchecked = getByTestId('aria-switch-unchecked')
expect(ariaSwitchChecked).toBeChecked()
expect(ariaSwitchUnchecked).not.toBeChecked()
```
###### **toBePartiallyChecked``**
Accepts an input of type `checkbox` and elements with a role of `checkbox`with a `aria-checked="mixed"`, or input of type `checkbox` with `indeterminate` set to `true`.  
```jsx
<input type="checkbox" aria-checked="mixed" data-testid="aria-checkbox-mixed" />
<input type="checkbox" checked data-testid="input-checkbox-checked" />
<input type="checkbox" data-testid="input-checkbox-unchecked" />
<div role="checkbox" aria-checked="true" data-testid="aria-checkbox-checked" />
<div
  role="checkbox"
  aria-checked="false"
  data-testid="aria-checkbox-unchecked"
/>
<input type="checkbox" data-testid="input-checkbox-indeterminate" />
```
```jsx
const ariaCheckboxMixed = getByTestId('aria-checkbox-mixed')
const inputCheckboxChecked = getByTestId('input-checkbox-checked')
const inputCheckboxUnchecked = getByTestId('input-checkbox-unchecked')
const ariaCheckboxChecked = getByTestId('aria-checkbox-checked')
const ariaCheckboxUnchecked = getByTestId('aria-checkbox-unchecked')
const inputCheckboxIndeterminate = getByTestId('input-checkbox-indeterminate')

expect(ariaCheckboxMixed).toBePartiallyChecked()
expect(inputCheckboxChecked).not.toBePartiallyChecked()
expect(inputCheckboxUnchecked).not.toBePartiallyChecked()
expect(ariaCheckboxChecked).not.toBePartiallyChecked()
expect(ariaCheckboxUnchecked).not.toBePartiallyChecked()

inputCheckboxIndeterminate.indeterminate = true
expect(inputCheckboxIndeterminate).toBePartiallyChecked()
```
###### **toHaveRole``**
roles are matched literally by string equality, without inheriting from the ARIA role hierarchy. As a result, querying a superclass role like 'checkbox' will not include elements with a subclass role like 'switch'.  
```jsx
toHaveRole(expectedRole: string)
```
```jsx
<button data-testid="button">Continue</button>
<div role="button" data-testid="button-explicit">Continue</button>
<button role="switch button" data-testid="button-explicit-multiple">Continue</button>
<a href="/about" data-testid="link">About</a>
<a data-testid="link-invalid">Invalid link<a/>
```
```jsx
expect(getByTestId('button')).toHaveRole('button')
expect(getByTestId('button-explicit')).toHaveRole('button')
expect(getByTestId('button-explicit-multiple')).toHaveRole('button')
expect(getByTestId('button-explicit-multiple')).toHaveRole('switch')
expect(getByTestId('link')).toHaveRole('link')
expect(getByTestId('link-invalid')).not.toHaveRole('link')
expect(getByTestId('link-invalid')).toHaveRole('generic')
```
###### **toHaveErrorMessage``**
This custom matcher is deprecated. Prefer **toHaveAccessibleErrorMessage** instead, which is more comprehensive in implementing the official spec.  
This allows you to check whether the given element has an `ARIA error message` or not.    
Use the `aria-errormessage` attribute to reference another element that contains custom error message text. Multiple ids is NOT allowed. Authors MUST use `aria-invalid` in conjunction with `aria-errormessage`.  
Whitespace is normalized.  
When a string argument is passed through, it will perform a whole case-sensitive match to the error message text.  
To perform a case-insensitive match, you can use a RegExp with the /i modifier.  
To perform a partial match, you can pass a *RegExp* or use *expect.stringContaining("partial string")*.  
```jsx
<label for="startTime"> Please enter a start time for the meeting: </label>
<input
  id="startTime"
  type="text"
  aria-errormessage="msgID"
  aria-invalid="true"
  value="11:30 PM"
/>
<span id="msgID" aria-live="assertive" style="visibility:visible">
  Invalid time: the time must be between 9:00 AM and 5:00 PM
</span>
```
```jsx
const timeInput = getByLabel('startTime')

expect(timeInput).toHaveErrorMessage(
  'Invalid time: the time must be between 9:00 AM and 5:00 PM',
)
expect(timeInput).toHaveErrorMessage(/invalid time/i) // to partially match
expect(timeInput).toHaveErrorMessage(expect.stringContaining('Invalid time')) // to partially match
expect(timeInput).not.toHaveErrorMessage('Pikachu!')
```
###### **toBePressed``**
It accepts elements with explicit or implicit `button` role and valid `aria-pressed` attribute of `"true"` or `"false"`.  
```jsx
<button aria-pressed="true">Pressed</button>
<button aria-pressed="false">Released</button>

<input type="button" aria-pressed="true" value="Pressed input button" />
<input type="button" aria-pressed="false" value="Released input button" />

<span role="button" aria-pressed="true">Pressed span</span>
<span role="button" aria-pressed="false">Released span</span>
```
```jsx
screen.getByRole('button', {name: 'Pressed'}).toBePressed()
screen.getByRole('button', {name: 'Released'}).not.toBePressed()

screen.getByRole('button', {name: 'Pressed input button'}).toBePressed()
screen.getByRole('button', {name: 'Released input button'}).not.toBePressed()

screen.getByRole('button', {name: 'Pressed span'}).toBePressed()
screen.getByRole('button', {name: 'Released span'}).not.toBePressed()
```
###### **toBePartiallyPressed``**
It accepts elements with explicit or implicit `button` role and valid `aria-pressed` attribute of `mixed`.
```jsx
<button aria-pressed="mixed">Partially pressed</button>
<input
  type="button"
  aria-pressed="mixed"
  value="Partially pressed input button"
/>
<span role="button" aria-pressed="mixed">Partially pressed span</span>
```
```jsx
<button aria-pressed="mixed">Partially pressed</button>
<input
  type="button"
  aria-pressed="mixed"
  value="Partially pressed input button"
/>
<span role="button" aria-pressed="mixed">Partially pressed span</span>
```
###### **toAppearBefore``**
This checks if a given element appears before another element in the DOM tree, as per `compareDocumentPosition()`.  
```jsx
<div>
  <span data-testid="text-a">Text A</span>
  <span data-testid="text-b">Text B</span>
</div>
```
```jsx
const textA = queryByTestId('text-a')
const textB = queryByTestId('text-b')

expect(textA).toAppearBefore(textB)
expect(textB).not.toAppearBefore(textA)
```
**Note**: This matcher does not take into account CSS styles that may modify the display order of elements, eg:   
- flex-direction: row-reverse,
- flex-direction: column-reverse,
- display: grid
###### **toAppearAfter``**
```jsx
<div>
  <span data-testid="text-a">Text A</span>
  <span data-testid="text-b">Text B</span>
</div>
```
```jsx
const textA = queryByTestId('text-a')
const textB = queryByTestId('text-b')

expect(textB).toAppearAfter(textA)
expect(textA).not.toAppearAfter(textB)
```
**Note**: This matcher does not take into account CSS styles that may modify the display order of elements, similar to toAppearBefore().  

