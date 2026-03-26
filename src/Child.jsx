import { useState } from "react";

function Child (props) {
    const [switchState, setSwitch] = useState(false)
    function handleClick () { setSwitch((switchState) => !switchState)}
    console.log(Math.floor(Math.random()* 11) )
    return (
        <>
        <h1>Child: What is on your mind man.</h1>
        {/* <p>{persona.name} is {persona.age} old. He is full of  {persona.value}.</p>
        {children} */}
        <button style={{background:"red"}}onClick={handleClick}>{switchState ? "ON": "OFF"}</button>
        </>
    )
}
export default Child;