import { useState } from "react";
import Child from "./Child.jsx";

function Parent () {
    const persona = {
        name: "Collins", 
        age: 5, 
        value: "pragmatism"
    }
    return (
        <>
            <h1>Parent: Hello there. Is this the rennaisance.</h1>
            <Child persona={persona}>
                <p>Not in the Normal stack but added anyway.</p>
            </Child>
        </>
    )
}
export default Parent;