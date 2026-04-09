
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
describe("QUERY METHODS", () => {
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
