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

