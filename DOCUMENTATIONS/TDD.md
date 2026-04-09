**Test-Driven Development:** a practice that developers use to build high quality programs and prevent errors from developing in their programs.  
Following test-driven development means that before a single line of code gets written, developers write tests first.  
The number one reason this is an important practice is because tests minimize the amount of errors and bugs in the code.  
##### Why Use TDD?  
- **Design:** TDD force you to think about the design of your code before you write it.  
It's easy to jump right into implementing the features of your application, but stopping to think about how exactly you want your code to function makes for well-designed and thoughtful programs.  
- **Discipline:** If you don't write tests first, you might never get around to writing them period.   
- **Less Work:** By repeating the process of 1: write test, 2: write code to make the test pass, developers end up writing only the code they need.  
It's an arduous process, so superfluous code comes with a lot of baggage (more tests!). Thus, developers ultimately only write the code that's wholly necessary.  
- **Confidence in Code:** Having test coverage for your application means that developers can have more confidence when making changes to the application, since they'll be able to run tests and validate that any newly added code doesn't break existing tests.  
- **Documentation:** Well-written tests can serve as a form of documentation as to how code is intended to work.  
If your tests are written like "stories" that describe the behavior of your code, the tests themselves can be a helpful resource for new developers to understand an application's code base.  

##### How Test-Driven Development Works. 
The typical test development cycle can be summed up with `"red, green, refactor."`
- **Red:** write a test to describe a small feature you want to build.  
When you run the test, it'll fail. Having a failing test at first is an important step in the process, since it will force you to think about the feature you're trying to build before writing the code for it.  
- **Green:** Write just enough code to make the test pass.  
Now when you run the test, it should pass. Don't worry about writing perfect code at this stage. Just think about the least amount of code required to make the tests pass.  
- **Refactor:** Make that code as succinct, clear, and DRY as possible.  
Refactor as necessary and re-test your code.

# Arrange-Act-Assert
**Arrange:** set up any data that need to be tested. 
**Act:** act upon the system being tested. 
**Assert:** make claims about what we expect the outcome to be. 
```jsx
it("returns the current year for a person born in year 0", () => {
  // Arrange
  const birthYear = 0;

  // Act
  const ageOfPerson = currentAgeForBirthYear(birthYear);

  // Assert
  expect(ageOfPerson).toBe(2022);
});
```
##### Sample Test Using the Arrange-Act-Assert TDD Technique.

```jsx
import { currentAgeForBirthYear } from "../utils";

describe("currentAgeForBirthYear", () => {
  it("returns the age of a person based on the year of birth", () => {
    const birthYear = 1984;
    const ageOfPerson = currentAgeForBirthYear(birthYear);
    expect(ageOfPerson).toBe(38);
  });
});
```
**describe** a function provided by Jest.  
It is a way of grouping related tests together so that when we run our tests, it is clear which tests describe the function.  
**it** function takes two params.  
- a `string` where we describe what we are testing.  
- a `callback function` where we write the actual test code.   
Jest also lets one use the ``**test**`` function the same way as `it` function.  
```jsx
test("returns the age of a person based on their year of birth", () => {});
```
*A test is always going to be about setting up a state with a known result, and comparing that known result (or expectation) to the behavior of your program, thus ensuring that your program behaves as you expected.*

### Running Tests. 
Use `npm test`or shortly `npm t`.
Jest also has a great **watch mode** feature which will automatically re-run the tests related to the changed files. To enable it, we update the `package.json`.
```json
{
  "scripts": {
    "test": "jest --watch"
  }
}
```
# Types Of Tests.
1. **Static** tests for typos in code and errors that can be detected without even running the application.   
You don't actually write them, there are tools such as  `ESLint` and `TypeScript` that help perform `static analysis` on your code to catch these errors.   
2. **Unit** tests for individual 'units'(which could be individual function, class or component.) in isolation from the rest of the application.  
The units shouldn't have any dependencies outside themselves.    
Written in frameworks such as Jest.  
3. **Integration** testing multiple related units of the application and the interactions between them.   
Written in frameworks such as Jest.  
4. **End-to-End** sometimes called ``functional testing``.  
This type of test works by running one's app. in an environment as close as possible to how a user would interact with it, and verifying that the application functions as expected.  
End-to-End tests should be run by a special program that can actually run one's code in a browser.  
`Playwright` and `Cypress` are the two most common libraries for this.

There are also other testing definitions of tests beyond these four categories, but in general, these four categories are good ways to roughly think about different levels at which to test your application.  
A good rule of thumb when you're determining what kind of test you're writing is to ask *whether the code you're testing depends on other parts of your application*.   
If it does, can it be refactored to be tested in isolation so that it can unit tested? If not, you'll be writing an integration test.  
Integration tests can be more challenging to write, but they also give more confidence that the application works as intended.  
# Testing Philosophies. 
1. **Martin Fowler's Test Pyramid** where "Service" and "UI" correspond to our defintions of "Integration" and "End-to-End".  
```
                    /  UI       \
                   /   SERVICE   \
                  /     UNIT      \
```
One big reason for this is that unit tests are relatively fast and easy to write, and also that they can be run quickly.     
Being able to run tests quickly becomes important once your application has hundreds of tests! Since TDD dictates running tests each time you write new code, having a slow test suite can make for a frustrating developer experience.  
In recent years (particularly in the JavaScript community), more emphasis has been placed on the value of writing integration tests and spending less time on unit testing.    
 One philosophy for testing that has been adopted as a replacement for the Test Pyramid is the `Kent C. Dodds' Test Trophy`:
2. **Kent C. Dodds' Test Trophy**   
[test pyramid]: https://martinfowler.com/bliki/TestPyramid.html
The idea behind this approach that the higher up you move in the trophy, the more confidence you'll have that that your tests are accurately representing the feature you're trying to build.    
The downside is that the higher up you move in the trophy, the more expensive and time consuming the tests are to run. So integration tests should be a good middle ground between confidence in your code and time needed to run the tests.
