import { useState, useContext } from "react";
import Child from "./Child.jsx";
import { UserContext} from "./Context.jsx";

function Parent () {
    const user = useContext(UserContext)
    console.log(user)
    const persona = {
        name: "Collins", 
        age: 5, 
        value: "pragmatism"
    }
    return (
        <>
            <h1>Parent: Hello there. Is this the rennaisance.</h1>
            <Child persona={persona}>
                <p>Called in the parent: Not in the Normal stack but added anyway.</p>
            </Child>
        </>
    )
}
export default Parent;