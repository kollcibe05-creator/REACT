In order to make React easier to work with, a specific file structure and set of dependencies is required.  
 Having to set all that up every time can be a bit of a pain and is also prone to error.    
On top of this, copying and pasting old React projects means you may miss out on the most up-to-date React features.   
Fortunately, the creators of React have also set up a handy tool for rapidly creating the barebones file structure we need for React apps. We'll  discuss how to use the create-react-app node package to get our own projects off the ground.  
#### Keeping up to Date
It is recommended to run `npm install -g npm` to ensure you have the latest npm version.   
```
npm install -g npm 
```
Once done, you can be able to use `npx` command to run tasks.    
#### Creating React App From Scratch
After navigating to the directory where you want your React to exist run:
```
npm install create-react-app . --use-npm
```
Using the `--use-npm` flag instructs CRA to run `npm install` to install the dependencies. 

### CRA FEATURES
```
your-app-name
├── README.md
├── node_modules
├── package.json
├── package-lock.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
```
- `/public`: Used for static assets, most importantly our index.html file.  
- `/src`: All our Javascript and CSS code must go in this folder. This is where our React components live.  
- `package.json`: ur project configuration, including npm scripts and our project's list of dependencies.  
Even though our package.json only lists a few key dependencies (namely react, react-dom, and react-scripts), Create React App provides a number of other dependencies under the hood that make our lives as developers easier! For example:   
`Babel`: a `transpiler` for converting modern JavaScript, and JSX, into something all browsers can understand.(or precompiling)    
`Webpack`: an *asset manager* that *bundles and minifies our JavaScript code, CSS files, and other assets like images* (this is what lets us import node modules and CSS files in our JavaScript files!)  
`ESLint`: a highly customizable tool for checking our code's syntax in the editor — think of it like a spell checker with superpowers

#### Other Tools For Creating React Apps
A few of 'em include:  
**Gatsby**:  static-site generator that turns your application into separate pages by building HTML files from JSX components. It's a popular choice for personal blogs, including Dan Abramov's overreacted.  
**Next.js**: a framework for creating static and server-side generated React applications.   


# BABEL
As you may already know, JavaScript (based on the ECMAScript [ES] standard) is an evolving language. Over time we have had several iterations that have incorporated additional features and language constructs, such as `ES6 arrow functions`, `class syntax`, `let`, and `const`.  
What was needed was a way to move all the different standards of JavaScript usage to the same standard. That is what Babel does — ``it translates all kinds of new JavaScript features into a common, standard code``.  
Less metaphorically, Babel gained popularity because it compiled/transpiled newer ES6 syntax and language features into the older (and more widely deployed, at that time) ES5. This was especially important when ES6 came out because many browsers had not yet updated their JavaScript engines to interpret the new language features of ES6.    
Nowadays, you are less likely to encounter browsers not implementing ES6 syntax. JavaScript is still updated regularly, and most modern browsers do a good job keeping up! If you're ever curious about whether or not a particular feature is supported in a browser, [caniuse.com](https://caniuse.com/) is a great resource.   
An example of our React code: 
```jsx 
const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```
Run through Babel, we receive the executable code:
```jsx
var profile = React.createElement(
  "div",
  null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```
### Heads UP
**Oxc** written in *Rust* aims for the fastets possible parse/transform times.Aimed to be faster than SWC and esbuild. Its offset is the lack of rich plugin ecosystem of Babel.
**Esbuild** written in *Go* is designed for blistering speed in bundling and minification used by Vite. Its trade-off is the absence of Polyfills, limited Customization and No Type Checking.  
**SWC** built in *Rust* as a faster replacement for Babel. Used by Next.js/Vercel.  
**Babel** which is JavaScript-based is slow but plugin-heavy.
**Vite/Rspack/Next.js** depend on SWC or esbuild for speed, replacing Babel in modern workflows.  
**Next.js/Vercel** uses *SWC* for transpilation(replacing Babel).
**Vite** traditionally used *esbuild* for dev and *Rollup* for prod but now encourages migration from esbuild to Oxc for minification.  
**Webpack/Rspack** uses *swc-loader* or *oxc-loader* for faster transformations.  
**SWC vs Babel**: SWC is a Rust-based tool designed to do everything Babel does `(transpile JS/TS)` but 20x faster.  
**Esbuild vs SWC**: Both are fast transpilers/minifiers. Esbuild excels as a bundler, whereas SWC is often used as a compiler (transpiler) integrated into other bundlers like Webpack.
**Oxc vs SWC/esbuild**: Oxc is the newest of the three, aiming to be 3x-5x faster than SWC and 20x-50x faster than Babel.
*Minification*: Terser used to be standard; now esbuild, SWC, and Oxc all provide internal, faster minifiers.
```
_________________________________________________________________________
| Tool 	    |    Language  | 	Primary Role	    |        Replaces    |
| -----------------------------------------------------------------------|
| Babel	    |    JS	       | Transpiler	            |   -                |
| esbuild	|    Go	       | Bundler/Minifier	    |   Webpack/Terser   |
| SWC	    |    Rust	   | Compiler (Transpiler)  |	Babel/Terser     |
| Oxc	    |    Rust	   | Tooling Primitives	    |   Babel/SWC/ESLint |
-------------------------------------------------------------------------
```
**Note:** As of 2026, Oxc is rapidly gaining traction as a high-performance successor to both SWC and Babel in transpilation and linting.


# Webpack
Picture having a server that sends some JavaScript-using webpage to browsers. Let's imagine we have some *animateDiv.js* script we want browsers to receive that itself makes use of `d3js`, a data visualization library.  
The first file we send to a requesting client, index.html, may look like this:  
```jsx
// index.html
<html>
  <head>
    <meta charset="utf-8" />
    <script src="./vendors/d3.js"></script>
    <script src="./lib/animateDiv.js"></script>
    <title>Discotek</title>
  </head>
  <body>
    <div class="animat" onclick="animateDiv">
      I'm going to animate if you click me!
    </div>
  </body>
</html>
```
With this approach, we are actually making three http requests to the server for the application:  
1. We hit the base url and are returned the index.html file.
2. index.html tells the browser to request d3.js from the server.
3. index.html tells the browser to request animateDiv.js from the server.  

A quick and dirty way around this would be to combine our JavaScript files into one file on the server (bringing this to two requests):
```jsx
<!-- index.html -->
<script src="./lib/combinedD3AnimateDiv.js"></script>
```
We could go one step further and even in-line the JavaScript directly into our HTML in a `<script> ` tag (sending everything at once in index.html):
```html
<!-- index.html -->
...
<script>
  // all the contents of d3.js and animateDiv.js written directly here!
</script>
...
```
Unfortunately, this is not very practical. We need to, by 'hand', combine JavaScript code from multiple files into one. Well...we're programmers! We automate the boring tasks like this! Introducing webpack!  
**webpackLinks** lets us combine different files automatically.  
This means that we can freely import external JS code in our JavaScript files (both local files as well as node_modules installed with npm). We trust that webpack, before we send clients our JS code over the internet, intelligently packages it up for us. In a simplified example:  
- File siliconOverlord.js has space-age AI code in it  
- File enslaveHumanity.js wants to make use of this other file and send it to browsers all over the internet.  
- Instead of always sending both enslaveHumanity.js and siliconOverlord.js to browsers, one after the other, webpack bundles them together into a single file that can be sent instead: singularity.js    
When compiling a React application with webpack, it'll check every file for dependencies that it needs to import, and also include that code.  
In more technical terms, it's traversing the dependency tree and inlining those dependencies in our application. What we'll end up with is one big JS file that includes all of our code, including any dependencies (like react, your components, your npm modules, etc.) in that file too.   
 The convenience of this is not to be underestimated: one file, with all of our code, means we only need to transfer a single thing to our clients when they ask for our React applications!  
#### Simpified webpack example
The files we want our client to have, which constitute one whole web application:   
```jsx
// reveal.js (pre webpack bundling)
function reveal(person, realIdentity) {
  person.identity = realIdentity;
}

export default reveal;
```
```jsx
// main.js (pre webpack bundling)
import reveal from "./reveal.js";

const spidey = {
  name: "Spider-Man",
  identity: "Friendly Neighborhood Spider-Man",
};

reveal(spidey, "Peter Parker");
```
Without webpack, we would need to find some way to send both files to our client and ensure they are playing nicely together.   
We couldn't just send the main.js file to our client expecting it to make use of the reveal function: the client hasn't even received the reveal.js file in this case! While we have several ways we could make this work, most of them are headaches and someone else has already made an excellent solution: webpack.  
The result after we unleash webpack on these files:  
```jsx
// bundle.js (post webpack bundling)
function reveal(person, realIdentity) {
  person.identity = realIdentity;
}

const spidey = {
  name: "Spider-Man",
  identity: "Friendly Neighborhood Spider-Man",
};

reveal(spidey, "Peter Parker");
```
After bundling our files with webpack, we have a single, all-encompassing, file that ensures our dependencies are right where they belong.  

In addition to bundling up our JavaScript code, webpack also allows us to manage all kinds of other assets in our React projects. You may have noticed that we're able to import CSS files and images in addition to importing JavaScript files — this is something we can only do because of webpack.  
**Summary**: In our React applications, webpack manages pesky dependency loading for us by bundling all the code — our own code plus the code for our dependences — and outputting it in a single file.  

# Reconciliation in React
Basically means how React handles updates to the screen.  
Earlier in the history of React, the term "Virtual DOM" was used to explain how React was able to perform better than the traditional DOM.  
The term 'Virtual DOM' fails to really explain what is happening and may lead to a misunderstanding of what is going on behind the scenes when React renders.  
 
#### Updating the DOM 
**DOM**: a programmatic representation of the document we see in the browser.  
In JavaScript applications, DOM elements can be added and changed with code. It's possible to build highly complex websites with hundreds or thousands of DOM elements using plain JavaScript.   
Maybe more importantly, through the DOM, JavaScript allows us to build highly interactive webpages that update dynamically without refreshing. This can come with some challenges, though.  
When the DOM updates, the browser recalculates CSS, lays out the DOM tree and 'repaints' the display.     
This typically happens so fast you barely notice. However, on a highly interactive website, or on a website where the JavaScript is updating the DOM excessively, the process of recalculating and repainting the display can result in noticeably poor performance.    
Any time you want your website or app to update without refreshing, you'll need to update the DOM; there is no avoiding it. However, React has some neat tricks for being smart about these updates.  
#### Reconciliation
In React, we know that we write components that return JSX elements. These JSX elements represent DOM elements, and when rendered, become those elements on a webpage.  
During the initial render, React also uses these elements to build a *'tree'* that represents what the DOM currently looks like, referred to as the ```current``` tree.  
When updates are made that would cause a re-render in React, a *second tree*, the ```workInProgress``` tree is created, representing what the DOM will look like.   
When all the updates are processed, the ```workInProgress``` tree is used to update the DOM and the ```current``` tree is updated to reflect the new updates.  
This is a key part of React's performance optimization — React uses these trees as an intermediate step between updates within components, such as a change of state, and updates to the DOM.   
This approach enables React to use two techniques that improve performance: ``grouped updates`` and ``diffing changes``.

### Grouped Updates
Because React creates a `workInProgress` tree, updates can be grouped together.    
By waiting until all updates are processed before committing the workInProgress tree to the DOM, excessive repaints are avoided.  
Say, for instance, you have an app with many components, each colored a shade of blue, and a button that, when pressed, turns all those components to red. When that button is pressed, React will put together a tree containing all the components along with their updated properties, THEN commit all the changes to the DOM at once. This only requires one repaint. Without this design, we could end up with code that updates the DOM for each individual part of the app, one repaint for each part.
### Diffing Changes
In addition to grouping updates to the DOM, React can apply a *diffing algorithm* to identify changes between what the current DOM looks like (the ``current`` tree) and what it will look like (the ``workInProgress`` tree), and quickly see what specific pieces of DOM need to be updated and how.  
In plain JavaScript — which you'll remember is what React is creating for us under the hood — some DOM changes are better than others in terms of performance.   
For example, say you want to add something inside a ul in your DOM. Using ``innerHTML`` will work:
```js
ul.innerHTML += "<li>A final list item</li>";
```
But this rebuilds the *entire DOM* inside div.  
On the other hand, using ``append`` would not cause a rebuild:
```js
let li = document.createElement("li");
li.textContent = "A final list item";
ul.append(li);
```
React compares the ```current``` and ```workInProgress trees```, identifies which pieces of the DOM need updating, and then uses the *most efficient* means for making each update.

##### Conclusion
There are some misconceptions floating around regarding the DOM being slow, often related to how frameworks like React can improve performance.  
While DOM manipulation itself isn't 'slow,' repainting what is displayed in the browser can be.  
React can be very smart about handling DOM updates, which improves performance. Primarily, it does this in two ways: ``grouping DOM updates`` to ``prevent excessive repaints`` and being ``selective about what specifically needs to update and how``.
Simplisticly, **Babel** compiles modern JS and JSX, **webpack** bundles and minifies code for production, **ESLint** helps with code quality; all just a tip of the iceberg.   