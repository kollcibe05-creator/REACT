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