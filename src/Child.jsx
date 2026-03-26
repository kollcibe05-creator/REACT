import { useState } from "react";

function Child (props) {
    const {children, persona: {name, age, value}} = props
    const [switchState, setSwitch] = useState(false)
    function handleClick () { setSwitch((switchState) => !switchState)}
    return (
        <>
        <h1>Child: What is on your mind man.</h1>
        <button style={{background:"red"}}onClick={handleClick}>{switchState ? "ON": "OFF"}</button>
        {children}
        </>
    )
}
export default Child;