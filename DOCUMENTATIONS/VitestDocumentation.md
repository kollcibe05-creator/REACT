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
- not
- toBe
- toBeCloseTo     //Good for decimal values
- toBeDefined
- toBeUndefined
- toBeTruthy
- toBeFalsy
- toBeNull
- toBeNullable
- toBeNaN
- toBeOneOf
- toBeTypeOf
- toBeInstanceOf
- toBeGreaterThan
- toBeGreaterThanOrEqual
- toBeLessThan
- toBeLessThanOrEqual
- toEqual                       //Number equivalence
- toStrictEqual
- toContain                    //for arrays
- toContainEqual
- toHaveLength
- toHaveProperty
- toMatch
- toMatchObject   
- toThrow
- toMatchSnapshot
- toMatchInlineSnapshot
- toMatchFileSnapshot
- toThrowErrorMatchingSnapshot
- toThrowErrorMatchingInlineSnapshot
- toMatchAriaSnapshot
- toMatchAriaInlineSnapshot
- toHaveBeenCalled
- toHaveBeenCalledTimes
- toHaveBeenCalledWith
- toHaveBeenCalledBefore
- toHaveBeenCalledAfter
- toHaveBeenCalledExactlyOnceWith
- toHaveBeenLastCalledWith
- toHaveBeenNthCalledWith
- toHaveReturned
- toHaveReturnedTimes
- toHaveReturnedWith
- toHaveLastReturnedWith
- toHaveNthReturnedWith
- toHaveResolved
- toHaveResolvedTimes
- toHaveResolvedWith
- toHaveLastResolvedWith
- toHaveNthResolvedWith
- called
- callCount
- calledWith
- calledOnce
- calledOnceWith
- calledTwice
- calledThrice
- lastCalledWith
- nthCalledWith
- returned
- returnedWith
- returnedTimes
- lastReturnedWith
- nthReturnedWith
- calledBefore
- calledAfter
- toSatisfy
- resolves
- rejects
- expect.assertions
- expect.hasAssertions
- expect.unreachable
- expect.anything
- expect.any
- expect.closeTo
- expect.arrayContaining
- expect.objectContaining
- expect.stringContaining
- expect.stringMatching
- expect.schemaMatching
- expect.addSnapshotSerializer
- expect.extend
- expect.addEqualityTesters

##### toBe && toEqual
Great for primitive values like `(numbers, strings and booleans)`.  
It checks the `identity`(whether they are the same object in memory not whether they have the same shape.)  
`toEqual` is reliable for `(objects and arrays)`.  
```jsx
test('toBe vs toEqual', () => {
  const a = { name: 'Alice' }
  const b = { name: 'Alice' }

  // These are different objects in memory
  expect(a).not.toBe(b)

  // But they have the same structure
  expect(a).toEqual(b)
})
```
#####  Objects Matchers
**toMatchObject**  
Used when interested in certain and not all fields in an Obj.  
It ignores the additional ones.  
```jsx
test('user has expected fields', () => {
  const user = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    createdAt: '2024-01-01'
  }

  // We only care about name and email here
  expect(user).toMatchObject({
    name: 'Alice',
    email: 'alice@example.com',
  })
})
```
**toHaveProperty**  
Used for checking individual properties, especially nested ones.  
You pass a dot-separated path and  optionally an expected value.  
```jsx
test("Object has property", () => {
    const user = {
        name: "Alice", 
        address: {city: "Paris", zip: "Big Protein"}
    }
    expect(user).toHaveProperty("name")
    expect(user).toHaveProperty("name", "Alice")
    expect(user).toHaveProperty("address.city")
    expect(user).toHaveProperty("address.city", "Paris")
})
```
##### toBeOneOf
Asserts if a value matches any of the values in the provided array or set.  
```jsx
import { expect, test } from 'vitest'

test('fruit is one of the allowed values', () => {
  expect(fruit).toBeOneOf(['apple', 'banana', 'orange'])
})
```
The asymmetric matcher is particularly useful when testing optional properties that could be either null or undefined:  
```jsx
test('optional properties can be null or undefined', () => {
  const user = {
    firstName: 'John',
    middleName: undefined,
    lastName: 'Doe'
  }

  expect(user).toEqual({
    firstName: expect.any(String),
    middleName: expect.toBeOneOf([expect.any(String), undefined]),
    lastName: expect.any(String),
  })
})
```
You can use `expect.not` with this matcher to ensure a value does not match any of the provided options.  
##### toBeTypeOf
Type:`(c: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined') => Awaitable<void>`  
*`toBeTypeOf` uses the native `typeof operator` under the hood with all its quirks, most notably that the value `null` has type `object`.*
##### toStrictEqual
Asserts if the actual value is equal to the received one or has the same structure if it is an object (compares them recursively), and of the same type.  
**Differences from .toEqual:**
1. Keys with `undefined` properties are checked. e.g. `{a: undefined, b: 2}` does not match `{b: 2}` when using `.toStrictEqual`.
2. Array sparseness is checked. e.g. `[, 1]` does not match `[undefined, 1]` when using .toStrictEqual.
3. Object types are checked to be equal. e.g. A class instance with fields `a` and `b` will not equal a literal object with fields `a` and `b`.
```jsx
import { expect, test } from 'vitest'

class Stock {
  constructor(type) {
    this.type = type
  }
}

test('structurally the same, but semantically different', () => {
  expect(new Stock('apples')).toEqual({ type: 'apples' })
  expect(new Stock('apples')).not.toStrictEqual({ type: 'apples' })
})
```
##### toContain
Asserts if the actual value is in an array.  
Also can check whether a string is a substring of another string.  
 If you are running tests in a browser-like environment, this assertion can also check if class is contained in a classList, or an element is inside another one.  
```jsx
import { expect, test } from 'vitest'
import { getAllFruits } from './stocks.js'

test('the fruit list contains orange', () => {
  expect(getAllFruits()).toContain('orange')
})

test('pineapple contains apple', () => {
  expect('pineapple').toContain('apple')
})

test('the element contains a class and is contained', () => {
  const element = document.querySelector('#el')
  // element has a class
  expect(element.classList).toContain('flex')
  // element is inside another one
  expect(document.querySelector('#wrapper')).toContain(element)
})
```
##### toContainEqual
Asserts if an item with a specific structure and value is contained in an array.  
Works like *toEqual* in every array.  
```jsx
import { expect, test } from 'vitest'
import { getFruitStock } from './stocks.js'

test('apple available', () => {
  expect(getFruitStock()).toContainEqual({ fruit: 'apple', count: 5 })
})
```
### Soft Assertions 
Normally a failing assertion stops the tests immediately. But sometimes you want to check several independent things and see all the failures at once rather than fix them one by one.  
`expect.soft` does exactly that.  
It records the failure but keeps the tests running.  
```jsx
test('check multiple fields', () => {
  const user = { name: 'Alice', age: 30, role: 'admin' }

  expect.soft(user.name).toBe('Alice')
  expect.soft(user.age).toBe(25) // this fails but execution continues
  expect.soft(user.role).toBe('admin')
  // the test report will show that age didn't match
})
```
This is especially useful for validating the shape of an API response or a complex object where multiple fields might be wrong at the same time.  

# Testing asynchronous Code. 
### Async/Await
The most straigh-forward way is to use `async`.  
```jsx
import { expect, test } from 'vitest'

function fetchUser(id) {
  return Promise.resolve({ id, name: 'Alice' })
}
test("Fetch the credentials of the user passed by id", async () => {
    const user = await fetchUser(7)
    expect(user.name).toBe("Alice")
})
```
### Resolves and Rejects
Sometimes you'd rather assert on a promise directly instead of await-ing it into a variable first. 
The `.resolves` and `.rejects` helpers let you do this.   
They unwrap the promise and then apply the matcher to the resolved or rejected value:
```jsx
test('resolves to Alice', async () => {
  await expect(fetchUser(1)).resolves.toMatchObject({ name: 'Alice' })
})

test('rejects with an error', async () => {
  await expect(fetchInvalidUser()).rejects.toThrow('User not found')
})
```
### Callbacks
Some older APIs use callbacks instead of promises. 
Since Vitest works with promises, the simplest approach is to wrap the callback in a `Promise`:
```jsx
function fetchData(callback) {
  setTimeout(() => callback('peanut butter'), 100)
}

test('the data is peanut butter', async () => {
  const data = await new Promise((resolve) => {
    fetchData(resolve)
  })
  expect(data).toBe('peanut butter')
})
```
## Timeouts
By default, each test has a 5-second timeout.  
If a test takes longer than that (perhaps because a promise never resolves, or a network request hangs), it will fail with a timeout error. This prevents your test suite from getting stuck indefinitely.  
You can set a `custom timeout` as the third argument to `test`, which is useful for tests that legitimately need more time:  
```jsx
test('long-running operation', async () => {
  await someSlowOperation()
}, 10_000) // 10 seconds
```
If you find yourself needing longer timeouts across many tests, you can change the default for all tests with the `testTimeout` config option:  
```jsx
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 10_000,
  },
})
```
# Concurrent Tests
By default, tests within a file run one after another.   
But if you have many independent async tests that each spend most of their time waiting (on network, disk, timers, etc.), running them concurrently with `test.concurrent` can significantly speed things up:
```jsx
test.concurrent('first async test', async () => {
  const result = await fetchUser(1)
  expect(result.name).toBe('Alice')
})

test.concurrent('second async test', async () => {
  const result = await fetchUser(2)
  expect(result.name).toBe('Bob')
})
```
# Setup and Teardown 
Often while writing tests, you need to do some work before tests run (initialize data, connect to a database, start a server) and clean up afterwards.  
Rather than duplicating this code in every test, Vitest provides lifecycle hooks that run automatically at the right time.  
##### beforeEach && AfterEach
```jsx
import { afterEach, beforeEach, expect, test } from 'vitest'

let items

beforeEach(() => {
  items = ['apple', 'banana', 'cherry']
})

afterEach(() => {
  items = []
})

test('items starts with 3 fruits', () => {
  expect(items).toHaveLength(3)
})

test('can add an item', () => {
  items.push('date')
  expect(items).toHaveLength(4)
  // afterEach will reset items for the next test,
  // so this mutation won't leak into other tests
})
```
#### One-Time SetUp ( beforeAll && AfterAll)
```jsx
import { afterAll, beforeAll, expect, test } from 'vitest'

let db

beforeAll(async () => {
  db = await connectToDatabase()
})

afterAll(async () => {
  await db.close()
})

test('can query users', async () => {
  const users = await db.query('SELECT * FROM users')
  expect(users.length).toBeGreaterThan(0)
})

test('can query products', async () => {
  const products = await db.query('SELECT * FROM products')
  expect(products.length).toBeGreaterThan(0)
})
```
#### Scoping with `describe`
Hooks defined inside a describe block only apply to the tests within that block.   
Top-level hooks apply to every test in the file.   
This lets you set up different state for different groups of tests:  
```jsx
import { beforeEach, describe, expect, test } from 'vitest'

describe('math operations', () => {
  let value

  beforeEach(() => {
    value = 0
  })

  test('can add', () => {
    value += 5
    expect(value).toBe(5)
  })

  test('can subtract', () => {
    value -= 3
    expect(value).toBe(-3) // value was reset to 0 by beforeEach
  })
})

describe('string operations', () => {
  let text

  beforeEach(() => {
    text = 'hello'
  })

  test('can uppercase', () => {
    expect(text.toUpperCase()).toBe('HELLO')
  })
})
```
# Setup Files
If you have setup code that needs to run before every test file in one's project( things like polyfills, global configs or custom matchers), you can put it in a setup file and point to it with the `setupFiles` config option.    
`vite.config.js`
```jsx
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./test/setup.js'],
  },
})
```
# Mock Functions
#### Creating Mock Functions
The simplest way to create a mock is with `vi.fn()`.  
This gives you a function that does nothing by default (returns `undefined1`), but tracks every call made to it:  
```jsx
import { expect, test, vi } from 'vitest'

test('mock function basics', () => {
  const getApples = vi.fn()

  // Call it
  getApples()

  // Check it was called
  expect(getApples).toHaveBeenCalled()
  expect(getApples).toHaveBeenCalledTimes(1)

  // By default, a mock returns undefined
  expect(getApples()).toBeUndefined()
})
```
#### Mock Return Values
A mock that always returns undefined isn't very useful on its own.  
You'll usually want to control what it returns so you can test how your code reacts to different values:  
```jsx
import { expect, test, vi } from 'vitest'

test('mock return values', () => {
  const getApples = vi.fn()

  // Always return this value
  getApples.mockReturnValue(10)
  expect(getApples()).toBe(10)

  // Return this value only once, then fall back to the default
  getApples.mockReturnValueOnce(20)
  expect(getApples()).toBe(20) // 20 (one-time)
  expect(getApples()).toBe(10) // back to default
})
```
If the function you're mocking is async, use `mockResolvedValue` and `mockRejectedValue` to control the promise outcome:   
```jsx
test('mock async return values', async () => {
  const fetchUser = vi.fn()

  fetchUser.mockResolvedValue({ name: 'Alice' })
  const user = await fetchUser()
  expect(user.name).toBe('Alice')

  fetchUser.mockRejectedValue(new Error('Not found'))
  await expect(fetchUser()).rejects.toThrow('Not found')
})
```
#### Mock implementation
Sometimes you need more than a fixed return value.  
You want the mock to actually do something with its arguments. `mockImplementation` lets you provide a full replacement function:  
```jsx
import { expect, test, vi } from 'vitest'

test('mock with custom implementation', () => {
  const add = vi.fn()
  add.mockImplementation((a, b) => a + b)

  expect(add(1, 2)).toBe(3)
  expect(add(10, 20)).toBe(30)
})
```
As an implementation, you can pass the implementation directly to `vi.fn()`
```jsx
const add = vi.fn((a, b) => a + b)
```
#### Inspecting Calls
One of the most powerful things about mock functions is that they remember every call made to them.   
You can assert on how many times a function was called, what arguments it received, and what it returned:  
```jsx
import { expect, test, vi } from 'vitest'

test('inspecting mock calls', () => {
  const greet = vi.fn()

  greet('Alice')
  greet('Bob', 'Charlie')

  // Number of calls
  expect(greet).toHaveBeenCalledTimes(2)

  // Check specific arguments
  expect(greet).toHaveBeenCalledWith('Alice')
  expect(greet).toHaveBeenCalledWith('Bob', 'Charlie')

  // Access the raw call data
  expect(greet.mock.calls).toEqual([
    ['Alice'],
    ['Bob', 'Charlie'],
  ])
})  
```
The `.mock` property gives you full access to the call history. In addition to `.mock.calls`, you can also inspect `.mock.results` to see what the mock returned (or threw) on each call:  
```jsx
const double = vi.fn(x => x * 2)

double(5)
double(10)

expect(double.mock.results).toEqual([
  { type: 'return', value: 10 },
  { type: 'return', value: 20 },
])
```
*`.mock.calls` stores references to the arguments, not copies. If you pass an object to a mock and then mutate it afterwards, the recorded call will reflect the mutated state, not the state at the time of the call.*  
The pattern works for any callback-based API.
*Everything in JS is truthy, except `false, null, undefined, NaN, O, -0, On, "" and document.all`*  


