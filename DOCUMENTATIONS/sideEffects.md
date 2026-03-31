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
### useEffect With Data Fetching.
If one's on slow connection, React shows up first and renders something. Sometimes it is just the background or the skeleton of a website, or maybe navigation and CSS. On Instagram, a photo 'card' might appear but without an image or username attached.  
React is updating the DOM based on the JSX being returned by its components first.  
Once the DOM has been updated, remote data is then requested. When that data has been received, React runs through an update of the necessary components and fills in the info it received. Text content will appear, user information, etc... This first set of data is likely just a JSON object specific to the user or content requested. This object might contain image URLs, so right after the component update, images will be able to load.  
In this case a `sideEffect` is inevitable.  

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [peopleInSpace, setPeopleInSpace] = useState([]);

  useEffect(() => {
    fetch("http://api.open-notify.org/astros.json")
      .then((response) => response.json())
      .then((data) => {
        setPeopleInSpace(data.people);
      });
  }, []);
  // use an empty dependencies array, so we only run the fetch request ONCE

  return <div>{peopleInSpace.map((person) => person.name)}</div>;
}

export default App;
```
It is also important to have a ``Loading indicator`` to inform the user that the data is being fetched.  
```jsx
function App() {
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://api.open-notify.org/astros.json")
      .then((response) => response.json())
      .then((data) => {
        setPeopleInSpace(data.people);
        setIsLoaded(true);
      });
  }, []);

  // if the data hasn't been loaded, show a loading indicator
  if (!isLoaded) return <h3>Loading...</h3>;

  return <div>{peopleInSpace.map((person) => person.name)}</div>;
}
```
### Fetching Data With Events
We aren't limited to sending fetch requests with useEffect. We can also tie them into events:  
```jsx
function handleClick() {
  fetch("your API url")
    .then((res) => res.json())
    .then((json) => setData(json));
}

return <button onClick={handleClick}>Click to Fetch!</button>;
```
### Using State With POST Requests.
```jsx
function Form() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //since the id values are the same as the keys in formData, we can write an abstract setFormData here
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="text"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
    </form>
  );
}
```
Then, when setting up the fetch request, we can just pass the entire state within the body, as there are no other values:  
```jsx
function handleSubmit(event) {
  event.preventDefault();
  fetch("the server URL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}
```
Notice how we're not bothering to worry about event.target when posting the data. Since the form is controlled, state contains the most up-to-date form data, and it is already in the right format!  

# CRUD
#### Displaying Items.
The common React pattern for working with server-side data:
*''
- When X event occurs (our application loads)  
- Make Y fetch request (GET /items)  
- Update Z state (add all items to state)
''*  
```jsx
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

    // Update state by passing the array of items to setItems  
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  // ...rest of component
}
```
Recap: 
- When X event occurs  
    Use the useEffect hook to trigger a side-effect in the  Component after the it first renders.  
- Make Y fetch request
    Make a GET request to /items to retrieve a list of items.  
- Update Z state  
    Replace our current list of items with the new list.  

#### Creating Items.
*
- When X event occurs (a user submits the form)  
- Make Y fetch request (POST /items with the new item data)  
- Update Z state (add a new item to state)
*
Our Case, a ShoppingList:
```jsx
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  function handleAddItem(newItem) {
    console.log("In ShoppingList:", newItem);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
```
Then in `ItemForm`:
```jsx
function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => onAddItem(newItem));
  }

  // ...rest of component
}
```
Finally, we need to call *setState* with a new array that has our new item at the end.  
In *shoppingList*:  
```jsx
function handleAddItem(newItem) {
  setItems([...items, newItem]);
}
```
Recap:
- When X event occurs
    When a user submits the ItemForm, handle the form submit event and access data from the form using state.    
- Make Y fetch request
    Make a POST request to /items, passing the form data in the body of the request, and access the newly created item in the response.    
- Update Z state    
  Send the item from the fetch response to the ShoppingList component, and set state by creating a new array with our current items from state, plus the new item at the end.  

#### Updating Items.  
*
- When X event occurs (a user clicks the Add to Cart button)
- Make Y fetch request (PATCH /items)
- Update Z state (update the isInCart status for the item)
*
We'll start by adding an event listener to the "Add to Cart" button.
```jsx
function Item({ item }) {
  function handleAddToCartClick() {
    console.log("clicked item:", item);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove">Delete</button>
    </li>
  );
}
```
Now, our PATCH;
```jsx
function handleAddToCartClick() {
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isInCart: !item.isInCart,
    }),
  })
    .then((r) => r.json())
    .then((updatedItem) => console.log(updatedItem));
}
```
Then update state;
```jsx
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  // add this callback function
  function handleUpdateItem(updatedItem) {
    console.log("In ShoppingCart:", updatedItem);
  }

  // ...rest of component

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* pass it as a prop to Item */}
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} />
        ))}
      </ul>
    </div>
  );
}
```
We can destrucuture the `onUpdateItem` prop and call it when we have the updated items in response from the server.  
```jsx
function Item({ item, onUpdateItem }) {
  function handleAddToCartClick() {
    // Call onUpdateItem, passing the data returned from the fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }
  // ... rest of component
}
```
As a last step, we need to call setState with a new array that replaces one item with the new updated item from the server.  
```jsx
function handleUpdateItem(updatedItem) {
  const updatedItems = items.map((item) => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    } else {
      return item;
    }
  });
  setItems(updatedItems);
}
```
Recap:
*
- When X event occurs
    When a user clicks the Add to Cart button, handle the button click
- Make Y fetch request    
    Make a PATCH request to /items/:id, using the clicked item's data for the ID and body of the request, and access the updated item in the response  
-   Update Z state    
    Send the item from the fetch response to the ShoppingList component, and set state by creating a new array which contains the updated item in place of the old item
*

#### Deleting Items.
*
- When X event occurs (a user clicks the DELETE button)
- Make Y fetch request (DELETE /items)
- Update Z state (remove the item from the list)
*
We'll start by adding an event handler for clicks on the button:  
Item.js
```jsx
function Item({ item, onUpdateItem }) {
  // ...rest of component

  function handleDeleteClick() {
    console.log(item);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      {/* ... rest of JSX */}

      {/* ... add onClick */}
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}
```
Next, our DELETE request:  
Still in Item.js
```jsx
function handleDeleteClick() {
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => console.log("deleted!"));
}
```
Note that for a DELETE request, we must include the ID of the item we're deleting in the URL. We only need the method option — no body or headers are needed since we don't have any additional data to send besides the ID.  
Our last step is to update state. Once again, the state that determines which items are being displayed is the items state in the ShoppingList component, so we need to call setItems in that component with a new list of items that does not contain our deleted item.  
We'll pass a callback down from ShoppingList to Item, just like we did for the update action:  
ShoppingList.js;
```jsx 
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  // add this callback function
  function handleDeleteItem(deletedItem) {
    console.log("In ShoppingCart:", deletedItem);
  }

  // ...rest of component

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* pass it as a prop to Item */}
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}
```
Call the onDeleteItem prop in the Item component once the item has been deleted from the server, and pass up the item that was clicked:  
```jsx
function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleDeleteClick() {
    // Call onDeleteItem, passing the deleted item
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  }
  // ... rest of component
}
```
As a last step, we need to call setState with a new array that removes the deleted item from the list.  
```jsx
function handleDeleteItem(deletedItem) {
  const updatedItems = items.filter((item) => item.id !== deletedItem.id);
  setItems(updatedItems);
}
```
*
- When X event occurs
    When a user clicks the Delete button, handle the button click
- Make Y fetch request    
    Make a DELETE request to /items/:id, using the clicked item's data for the ID
- Update Z state    
    Send the clicked item to the ShoppingList component, and set state by creating a new array in which the deleted item has been filtered out
*

