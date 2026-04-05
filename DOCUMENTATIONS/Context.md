We usually have many components each requiring a certain number of props. 
Conversely, some usually take in props which they do not entirely need just to pass them along to the child component resulting to ``prop drilling`` which can become a burden for deeply-nested component hiararchies.   
React Context solves this propblem.

In order to create our context, we need to create two things:
1. The actual context object.
2. A context provider component.

## I
create a context using:
```jsx
const UserContext = React.createContext()
```
Or better using the ``createContext`` React inbuilt hook.
```jsx
import React, {createContext} from 'react'

const UserContext = createContext()
```
The final structure of the page:
```jsx
import React, {createContext} from 'react'
//Create the context
const UserContext = createContext()

function UserProvider ({children}){
    const user = {
        name: "Dwayne Johnson", 
        age: 55, 
        Category: 'Film'
    }
    //The value prop of the provider will be our context data.
    //This value will be available to child components of this provider.
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
export {UserContext}
export default UserProvider
```
Update the parent container to wrap the Components that require the access of the context.  
```jsx
import { useEffect, useState } from 'react'
import './App.css'
import {format} from 'date-fns'
import Parent from "./Parent.jsx"
import Children from './Children.jsx'
import UserProvider from "./Context"; //*Import*

function App() {
  return (
    <>
      <UserProvider>
      <Parent/>
      <Children/>
      </UserProvider>

    </>
  )
}

export default App

```
This allows the individual components to use the context as follows: 
```jsx
import { useEffect, useState } from 'react'
import './App.css'
import {format} from 'date-fns'
import Parent from "./Parent.jsx"
import Children from './Children.jsx'
import UserProvider from "./Context";


function App() {
  return (
    <>
      <UserProvider>
      <Parent/>
      <Children/>
      </UserProvider>

    </>
  )
}

export default App
```
Then the wrapped components can use the context:
```jsx
import { useContext } from "react";
import { UserContext } from "./Context"; //import the context

function Children (props) {
    const{children, data} = props
    const user = useContext(UserContext)  {/*call userContext with the UserContext*/} 
    console.log(user)
    return (
        <>
        <div>
                Something innit.
        </div>
        {children} {/*/Very important*/}
        </>
    )
}
export default Children;
```
Since UserProvider here is still a normal React component, we can use any hooks we'd like within this component.  
Example: 
```jsx
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```
Then in specific files, destructuring is bound as our contexted has changed.  
```jsx
 const { user } = useContext(UserContext);
```

