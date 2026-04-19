Vitest reads your `vite.config.*` by default, so your existing Vite plugins and configuration work out-of-the-box.   

```jsx
import { expect, describe, it, test} from 'vitest' // You can (or chose not) to import `test`, `describe`, `expect` and `it`(if of course you have enabled globals in vite.config.js)
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
```
# Using Global imports
As pin-pointed above, by default you import test, expect, describe, and other functions from the vites at the top of every file list.  
You would rather use them as globals without importing by enabling the `globals` option in one's `vite.config.js`.  

# Test files
By default, Vitest looks for any file that contains **.test.** or **.spec.**.  
It searches in all directories so it doesn't matter where you place them.  
The exact patterns are:  
- ``**/*.test.{ts,js,mjs,cjs,tsx,jsx}``
- ``**/*.spec.{ts,js,mjs,cjs,tsx,jsx}``

# Skipping and Focusing Tests
- .only
- .skip
- .todo
**.todo** lets you mark a placeholder for a test you haven't written yet. Vitest will list it in the output so one can't forget about it.  
```jsx
describe.todo("Will get back to this later on", () => {
    
})
```
```jsx
 ✓ add 1 + 2 = 3 8ms
     ✓ returns NaN for negative numbers 1ms
   □ Will get back to this later on (0)
```
# Using Matchers 
