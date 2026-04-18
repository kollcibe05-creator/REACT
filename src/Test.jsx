import { useState } from "react"

function Test() {
    const [addPepperoni, setPepperoni] = useState(false)
            
    function togglePepperoni() {
        setPepperoni(!addPepperoni)
    }
    return (
        <div>
            <header>
            <h1>Well Hello There</h1>
            <a href="https://www.youtube.com">Never Gonna Give You Up</a>
            <button>Click Me!</button>
            </header>
            <h1>Select Pizza Toppings</h1>
            <input 
            type="checkbox"  
            id="pepperoni" 
            checked={addPepperoni} 
            aria-checked={addPepperoni}
            onChange={togglePepperoni}
            />
            <label htmlFor="pepperoni">Add pepperoni</label>
            <h2>Your Toppings</h2>
            <ul>
                <li>Cheese</li>
                {addPepperoni ? <li>Pepperoni</li> : null}
            </ul>

        </div>
    )
}
export default Test