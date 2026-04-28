# What formik Helps with 
1. Getting values in and out of the form. 
2. Validation and error messages.  
3. Handling form submission.  

There is no need for use of complex libraries like `Redux-Form` as Dan Abramov stated: form state is ephemeral and local, so tracking it in Redux (or any other kind of Flux library) is unnecessary.  
Also, Redux-Form calls your entire top-level Redux reducer multiple times ON EVERY SINGLE KEYSTROKE. This is fine for small apps, but as your Redux app grows, input latency will continue to increase if you use Redux-Form.  
Redux-Form is 22.5 kB minified gzipped (Formik is 12.7 kB).  
# Installation
```
npm install formik --save
```
Formik is compatible with React v15+ and works with ReactDOM and React Native.
# Gist
Formik keeps track of one's form's state and then exposes it plus a few reusable methods and event handlers( `handleChange`, `handleBlur`, `handleSubmit`) to one's form via props.  
`handleChange` and `handleBlur` use a `name` or `id` attribute to figure out which field to update.  
```jsx
import React from "react"
import {Formik} from "formik"

const Basic = () => {
    <div>
        <h1>Anywhere.<h1>    
                
    </div>
}
```