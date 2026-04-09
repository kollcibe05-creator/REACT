import React from "react"
import pointsForWord from "../utils"
import isPalindrome from "../utilsPalindrome"

describe("pointsForWord", () => {
    it("pointsForWord function should exist", () => {
        expect(pointsForWord).toBeDefined()
    })
    it("Calculates the total points for a word(1 point per vowel, 2 per consonant.)", () => {
        const totalPoints = pointsForWord("Mark")
        expect(totalPoints).toBe(7)
    })
})
describe("isPalindrome()", () => {
    it("throws an error if the word has a number or symbol", () => {
            expect(() => isPalindrome("Ho2iah")).toThrow("Invalid input")
    })
    it("correctly checks for a palindrome", () => {
        expect(isPalindrome("racecar")).toBeTruthy()
        expect(isPalindrome("racercar")).toBeFalsy()
    })
}) 
