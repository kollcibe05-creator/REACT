Vite uses ESModules by default but Jest which syncs well with commonJS does not support `import` statements or JSX out of the box without specific transformation rules.  
Jest still relies heavily on CommonJS under the hood unless specifically configured for "Experimental ESM."  
JSX: Jest is a JavaScript runner, not a browser. It sees `<Component />` or import and panics because it doesn't have a "translator" (like Babel) active to turn that into ``React.createElement``.  
Without configuration, Jest runs `.jsx` files as plain Node.js code and it doesn't know how to handle that syntax without a transpiler like `Babel`or `SWC`.  
The most optimal solution is usually to use **Vitest** which understands JSX and imports without extra Babel config.  
# Vitest Configuration.
To install; 
```
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```
Then update `package.json` to use vitest;
```json
"scripts": {
  "test": "vitest"
}
```
Then make sure Vite knows how to use `jsdom`(to simulate a browser for React components) in the file `vite.config.js`; 
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
```
# Jest Configuration.
If one must use Jest, Babel needs to be added to bridge the gap.  
1. Installation of dependencies; 
```
npm install -D jest babel-jest @babel/core @babel/preset-env @babel/preset-react identity-obj-proxy jest-environment-jsdom
```
2. Then create a `babel.config.cjs` file in the `root` folder.  
```cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
```
If we were using `commonJS` there would no longer be a strict ESM environment, hence we can rename our config file to `babel.config.js`. This file tells Jest how to transpile your React code into something Node can run.    
No change is imminent in the format as of .cjs'
*(Note): The { runtime: 'automatic' } is important for React 17+ so you don't have to manually import React from 'react' in every single file.*  
3. Then create a `jest.config.cjs`.  
Since our project is `"type": "module"`, Jest needs a configuration file ending in `.cjs`.  
```cjs
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    //Tells Jest "If you see a JS or JSX file, use Bable to read it."
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    //Mocks out CSS/Style imports which would otherwise break Jest.
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
```
For the case of commonJS, use `jest.config.js` to esnure Jest uses `babel-jest` to process files and provide a browser-like  environment.  
The *jest.config.js* syntax will be similar to the *.cjs*'
4. Then you can update the `package.json` to use jest as the test package.  
```json
"scripts": {
  "test": "vitest"
}
```
Even better, add the ``--watch`` flag that re-runs the tests upon change in the tested code.  
```json
"scripts": {
  "test": "jest --watch"
}
```