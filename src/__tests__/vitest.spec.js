// import { expect, describe, it, test} from 'vitest' // You can (or chose not) to import `test`, `describe`, `expect` and `it`(if of course you have enabled globals in vite.config.js)
describe("BASIC MATCHERS AND PRACTICES", () => {
    test("add 1 + 2 = 3", () => {
        expect(1 + 2).toBe(3)
    })
    it("returns NaN for negative numbers", () => {
            expect(Math.sqrt(-1)).toBeNaN()
    })
})
describe.todo("Will get back to this later on", () => {
    
})