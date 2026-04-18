
//import the logRoles method.
import  {logRoles, render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import Test from "../Test"
import { add } from 'date-fns'
import { describe } from 'vitest'

describe.skip("Test should be present", () => {
    it("Test must contain a h1 with a text Well Hello There", () => {
        //Arrange

        render(<Test/>)

        //Act
        const text = screen.getByText(/Well Hello there/i)       

        //Assert
        expect(text).toBeInTheDocument()
    })
   
})
describe.skip("QUERY METHODS", () => {
    it("Test has an <a> tag with the text \"never gonna give you up\" (getByRole)", () => {
        // "container" represents all the DOM elements rendered by our component.
        const {container} = render(<Test/>)

        //Prints out the accessible elements in our component along with their roles.    
        logRoles(container)

        const linkElement = screen.getByRole("link", {
            name: /never gonna give you up/i,
        })

        expect(linkElement).toBeInTheDocument()
    })
    it("The <a> tag link has the correct URL (toHaveAttribute)", () => {
            render(<Test/>)
            const linkElement = screen.getByRole("link", {name: /never gonna give you up/i})
            expect(linkElement).toHaveAttribute("href", "https://www.youtube.com")
    })
    it("additional options by the (getByRole)", () => {
            render(<Test/>)

            const topLevelHeading = screen.getByRole("heading", {
                    name: /Well Hello There/i, 
                    exact: false,  //partial matches will be included.
                    level: 1  //We need this to be a top level (h1, not h2, h3...)
            }) 

            expect(topLevelHeading).toBeInTheDocument()
    })
})
describe.skip("WORKING WITH EVENTS", () => {
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
