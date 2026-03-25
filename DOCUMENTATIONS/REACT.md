React is technically a library not a framework.  
This is due to the fact that it is declarative and not imperative.
Popular `frameworks` and tools have been built on top of it with it experience and more compelete addendum.
It is actively maintained by Facebook.
- **Next.js** ~ a fullstack React framework that adds features like server-side rendering, routing and file-based conventions.
- **Expo** ~ React Native framework for building universal iOS, Android and web apps with native UIs.

### Some Awesome React Features 
1. Declarative 
2. Component-based.
3. Learn Once, Write Anywhere 

### React Tools(2)
There are two main react tools:
1. **Create-React-App(CRA)**  
This tool is legacy and no longer maintained.
It comes about with additional tools that make React development better:
  - **Babel** - included transpiler that converts modern JS and custom code like JSX into more widely compatible JS.
  - **webpack** - a 'bundler' that takes all our work, along with any other required dependency code, and packages it all up into a single, transferrable bundle.
  - **Build in linting and code analysis functionality** using ``ESLint`` to help improve our code, reinforce best practices and catch common mistakes.
2. **Vite**


``Dependency tree`` can span as massively since each file has its own package.json and so on. All the downloaded packages are contained in the ``node_modules``. 
To run a lightweight server: 
```
npm install serve 
```
Then in package.json:
```js
"scripts": {
  "test": "echo 'Hello World!'",
  "start": "serve"
}
```
The additionally you can download ``esbuild`` ~ a JavaScript bundler, which is a tool that handles all of a project's dependencies, and combines the code into a single file that is browser-ready. 
```

npm install esbuild
```
Then in package.json add the script:
```js
"scripts": {
  "test": "echo 'Hello World!'",
  "start": "serve",
  "build": "esbuild index.js --bundle --outfile=dist/out.js"
}
```
When we run a build using esbuild, it makes sure that all the dependencies are included and up to date, and combines the code from multiple files into a single file that is ready to be loaded in the browser.
Note that the name of this file is specified in the build command above: dist/out.js.
To run:
```
npm run build
```
That is after updating the script in the index.html file.
```html
<script src="index.js" type="module"></script>
```
Change the src property to ``dist/out.js``

Jest comes preinstalled when one generates a React project using CRA.
