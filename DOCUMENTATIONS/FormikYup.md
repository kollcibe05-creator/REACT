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

const Basic = () => (
    <div>
        <h1>Anywhere.</h1>    
        <Formik
            initialValues = {{email: "", password: ""}}
            validate = {values => {
                const errors = {}
                if (!values.email) {
                    errors.email = "Required"
                } else if (
                    !/^[A-Z0-9._%+-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email address."
                }
                return errors
            }}
            onSubmit = {(values, {setSubmitting}) => {   
                //  onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //     alert(JSON.stringify(values, null, 2));
                //     setSubmitting(false);
                //     }, 400);
                fetch("api/posts", {
                    method: POST, 
                    headers: {'Content-Type': "application/json"}, 
                    body: JSON.stringify(values)
                })
                .then(r => r.json())
                .then(data => {
                    setSubmitting(false)
                    setData(data)
                })
            }} 
        >        
        {({values, errors, touched, handleChange, handleBur, handleSubmit, isSubmitting}) => (
            <form>
                <input 
                   type="email"
                   name="email"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.email}
                />           
                {errors.email && touched.email && errors.email}
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                
                <button type="submit" disabled={isSubmitting}>Submit</button>

            </form>   
        )}
        </Formik>
    </div>
)
```
### Reducing Boilerplate
To save time, Formik comes with a few extra components to make life easier and less verbose:  
`<Form/>, <Field/>, <ErrorMessage/>`  
```jsx
import React from "react"
import {Formik, ErrorMessage, Field, Form} from "formik"

const Basic = () => (
    <div>
        <h1>Revamp edition</h1>
        <Formik
            initialValues = {{email: "", password: ""}}
            validate = {values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit = {
                (values, {setSubmitting}) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }
            }
        >
        {({isSubmitting}) => (
            <Form>
                <Field type="email" name="email"/>
                <ErrorMessage name="email" component="div"/>
                <Field type="password" name="password"/>
                <ErrorMessage type="password" component="div"/>
                <button type="submit"disabled={isSubmitting}>Submit</button>
            </Form>
        )}
        </Formik>
    </div>
)
```
As seen above validation is left upon you, you can write your own validators or use a 3rd party library like `Yup` for object schema validation.  
It has an API that's pretty similar to `Joi/React PropTypes` but is small enough for browser and fast enough for runtime usage.  
Formik has a special config option/prop for yup called `validationSchema` which will automatically transform Yup's validation errors into a pretty object whose keys match values and touched.   

# Code-Along
Imagine we want to add a newsletter for a signup form for a blog. With Formik, this is just a few lines.   
```jsx
import React from "react"
import {useFormik} from "formik"

const signUpForm = () => {
    const formik = useFormik({
        initialValues: {
        email: "",
    }, 
    onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
    },
})

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email", 
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <button type="submit">Submit</button>
        </form>
    )
}    
```
We pass our form's `initialValues` and a submission function to the `useFormik` hook.  
The hooks returns to us a goodie bag of form state and helper methods in a variable we call `formik`.  
For now the helper methods we care about are:  
- `handleSubmit`: A submission handler.  
- `handleChange`: A change handler to pass to each `<input>`, `<select>`and `<textarea>`.  
- `values`: Our form's current values.  

```jsx
import React from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```
Looking carefully at our new code, you will notice some symmetry and patterns forming.  
1. We reuse the same exact change handler function `handleChange` for each HTML input.  
2. We pass an `id` and `name` HTML attribute that matches the property we defined in `initialValues`. 
3. We access the field's value using the same name `(email => formik.values.email)`

If you’re familiar with building forms with plain React, you can think of Formik’s handleChange as working like this:  
```jsx
const [values, setValues] = React.useState({});

const handleChange = event => {
  setValues(prevValues => ({
    ...prevValues,
    // we use the name to tell Formik which key of `values` to update
    [event.target.name]: event.target.value
  }));
}
```
# Validation 
Of course there must be validations. We may choose to add a `required` prop to each of our inputs, specify minimun/maximum lengths, and/or add `pattern` prop for regex validation for each inputs....   
These are great but the caveat is that HTML validations only work in the browser. Second, it's hard/impossible to show custom error messages to our user. Third, this is very janky.  

```jsx
import React from "react"
import {useFormik} from "formik"

const validates = values => {
    const errors = {}
    if(!values.firstName) {
        errors.firstName = "Required"
    } else if (errors.firstName.length > 15){
        errors.firstName = 'Must be 15 characters or less';
    }
    if (!values.lastName) {
     errors.lastName = 'Required';
   } else if (values.lastName.length > 20) {
     errors.lastName = 'Must be 20 characters or less';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
 
   return errors;
}

const SignupForm = () => {
   // Pass the useFormik() hook initial form values, a validate function that will be called when
   // form values change or fields are blurred, and a submit function that will
   // be called when the form is submitted
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.firstName}
       />
       {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
 
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.lastName}
       />
       {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
 
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
       {formik.errors.email ? <div>{formik.errors.email}</div> : null}
 
       <button type="submit">Submit</button>
     </form>
   );
 };
```
`formik.errors` is populated via the custom validation function.  
By default formik will validate after every keystroke (change event), each input's `blur event`, as well as prior to submission.   
The `onSubmit` function passed to `useFormik()` will executed only if there are no errors(i.e if our `validate` function returns `{}`).    

# Visited Fields
While our form works, and our users see each error, it’s not a great user experience for them.  
Since our validation function runs on each keystroke against the entire form’s `values`, our `errors` object contains all validation errors at any given moment.    
In our component, we’re just checking if an error exists and then immediately showing it to the user.   
This is awkward since we’re going to show error messages for fields that the user hasn’t even visited yet. Most of the time, we only want to show a field’s error message after our user is done typing in that field.  
Like `errors` and `values`, Formik keeps track of which fields have been visited.  
It stores this information in an object called `touched` that also mirrors the shape of `values/initialValues`.     
The keys of `touched` are the field names, and the values of touched are booleans `true/false`.    
To take advantage of `touched`, we pass `formik.handleBlur` to each input’s `onBlur` prop.    
This function works similarly to `formik.handleChange` in that it uses the `name` attribute to figure out which field to update.  
```jsx
import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};
```
Now that we’re tracking touched, we can now change our error message render logic to *only* show a given field’s error message if it exists *and* if our user has visited that field.   
```jsx
import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};
```
# Yup  Sample

### Installation
```
npm install yup --save
```
```jsx
import React from "react"
import {useFormik} from "formik"
import * as Yup from "yup"

const signUpForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        }, 
        validationSchema: Yup.object({
            firstName: Yup.string()  
            .max(15, "Must be 15 characters or less")
            .required("Required"), 
            lastName: Yup.string()
            .max(20, "Must be 20 characters or less.")
            .required("Required."), 
            email: Yup.string().email("Invalid email address").required("Required.")
        }), 
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.firstName}
       />
       {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.firstName}</div>
       ) : null}
 
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.lastName}
       />
       {formik.touched.lastName && formik.errors.lastName ? (
         <div>{formik.errors.lastName}</div>
       ) : null}
 
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       />
       {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
 
       <button type="submit">Submit</button>
     </form>
   );    
}
```
## Reducing Boilerplate
#### getFieldProps()
The code above is very explicit about what exactly Formik is doing: 
onChange -> handleChange, onBlur -> handleBlur, and so on.  
However, to save you time, `useFormik()` returns a helper method called `formik.getFieldProps()` to make it faster to wire up inputs.   
Given some field info, it returns to you the exact group of `onChange`, `onBlur`, `value`, `checked` for a given field.  
You can then spread that on an `input`, `select` or `textarea`.  
```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        {...formik.getFieldProps('firstName')}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" {...formik.getFieldProps('email')} />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};
```
# Leveraging React Context
Our code above is again very explicit about exactly what Formik is doing.  
onChange -> handleChange, onBlur -> handleBlur, and so on.   
However, we still have to manually pass each input this "prop getter" `getFieldProps()`  
To save you even more time, Formik comes with React Context-powered API/components to make life easier and code less verbose: `<Formik />`, `<Form />`, `<Field />`, and `<ErrorMessage />`.     
More explicitly, they use React Context implicitly to connect with the parent `<Formik />` state/methods.
Since these components use `React Context`, we need to render a React Context Provider that holds our form state and helpers in our tree. If you did this yourself, it would look like:    
```jsx
import React from 'react';
import { useFormik } from 'formik';

// Create empty context
const FormikContext = React.createContext({});

// Place all of what’s returned by useFormik into context
export const Formik = ({ children, ...props }) => {
  const formikStateAndHelpers = useFormik(props);
  return (
    <FormikContext.Provider value={formikStateAndHelpers}>
      {typeof children === 'function'
        ? children(formikStateAndHelpers)
        : children}
    </FormikContext.Provider>
  );
};
```
Luckily, we’ve done this for you in a `<Formik>` component that works just like this.  
Let’s now swap out the `useFormik()` hook for Formik’s `<Formik>` component/render-prop.   
Since it’s a component, we’ll convert the object passed to `useFormik()` to `JSX`, with each key becoming a `prop`.    
```jsx
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...formik.getFieldProps('lastName')}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}

          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};
```
As you can see above, we swapped out `useFormik()` hook and replaced it with the `<Formik>` component.   
The `<Formik>` component accepts a function as its children (a.k.a. a `render prop`).   
Its argument is the exact same object returned by `useFormik()` (in fact, `<Formik>` calls `useFormik()` internally!).   
Thus, our form works the same as before, except now we can use new components to express ourselves in a more concise manner.

```jsx
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />
        <ErrorMessage name="firstName" />

        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
```
The `<Field>` component by default will render an `<input>` component that, given a name prop, will implicitly grab the respective onChange, onBlur, value props and pass them to the element as well as any props you pass to it.  
However, since not everything is an input, `<Field>` also accepts a few other props to let you render whatever you want. Some examples..  
```jsx
// <input className="form-input" placeHolder="Jane"  />
<Field name="firstName" className="form-input" placeholder="Jane" />

// <textarea className="form-textarea"/></textarea>
<Field name="message" as="textarea" className="form-textarea" />

// <select className="my-select"/>
<Field name="colors" as="select" className="my-select">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Field>
```
React is all about composition, and while we’ve cut down on a lot of the prop-drilling, we’re still repeating ourselves with a `label`, `<Field>`, and `<ErrorMessage>` for each of our inputs.   
We can do better with an abstraction.   
With Formik, you can and should build reusable input primitive components that you can share around your application.  
Turns out our `<Field>` render-prop component has a sister and her name is `useField` that’s going to do the same thing, but via React Hooks:  

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({children, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {children}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          jobType: '', // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};
```
As you can see above, `useField()` gives us the ability to connect any kind input of React component to Formik as if it were a `<Field>` + `<ErrorMessage>`.   
# Arrays and Nested Objects
### Nested Objects
The `name` props in Formik can use lodash-like dot paths to reference nested Formik values. This means that you do not need to flatten out your form's values anymore.  
```jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';

export const NestedExample = () => (
  <div>
    <h1>Social Profiles</h1>
    <Formik
      initialValues={{
        social: {
          facebook: '',
          twitter: '',
        },
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Form>
        <Field name="social.facebook" />
        <Field name="social.twitter" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);
```
### Arrays
Formik also has support for arrays and arrays of objects out of the box.   
Using lodash-like bracket syntax for `name` string you can quickly build fields for items in a list.  
```jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';

export const BasicArrayExample = () => (
  <div>
    <h1>Friends</h1>
    <Formik
      initialValues={{
        friends: ['jared', 'ian'],
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Form>
        <Field name="friends[0]" />
        <Field name="friends[1]" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);
```
### Avoid nesting
If you want to avoid this default behavior Formik also has   for it to have fields with dots.
```jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';

export const NestedExample = () => (
  <div>
    <h1>Social Profiles</h1>
    <Formik
      initialValues={{
        'owner.fullname': '',
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Form>
        <Field name="['owner.fullname']" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);
```
# Aside
## Handling select, radio input and checkboxes
Formik usually binds these fields to state based on the `name` attribute.  
### Validation Schema (Yup)
- **Checkboxes:** Usually a `boolean` (single toggle) or an array (group).
- **Radio buttons:** Usually a string representing the selected option.  
- **Select:** Typically a string.  

```jsx
import * as Yup from "yup"

const validationSchema = Yup.object.shape({
    terms: Yup.boolean().oneOf([true], "You must accept the terms"), //single checkbox
    hobbies: Yup.array().min(1, "Select at least one hobby."), //checkbox group
    gender: Yup.string().required("Please select a gender.")
    country: Yup.string().required("Please select a country.")  //Select dropdown
})
```
##### Single Checkbox and Select Field
For basic select and single Checkbox inputs, you can use the standard `<Field/>` component with the `as` or `type` prop.
```jsx
<Formik
 initialValues={{terms: false, country: ""}}
 validationSchema={validationSchema}
 onSubmit={values => console.log(values)}
>
{({errors, touched}) => (
    <Form>

        <Field as="select" name="country">
            <option value="">Select a country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="kenya">KENYA</option>
        <Field/>

        <label>
            <Field type="checkbox" name="terms"/>
            Accept Terms
        </label>
        <button type="submit">Submit</button>
    </Form>
)}
</Formik>
```
##### Radio and Checkbox Groups
For groups where multiple inputs share the same `name`, Formik collects their values into a single string (radio) or array (checkboxes).  
**Radio Group:** Use multiple `<Field type="radio">` with the same `name` but different `value` props.  
**Checkbox Group:** Use multiple `<Field type="checkbox">` with the same `name`. Formik will automatically treat these as an array.  
```jsx
initialValues={{
  gender: '', // or a default value like 'male'  //RADIO
  hobbies: [] //must be an empty array to start  // CHECKBOX GROUP 
  //a group of checkboxes allow multiple selections so Formik needs an array to store those values.  
}}


{/* Radio Group Example */}
<div role="group">
  <label><Field type="radio" name="gender" value="male" /> Male</label>
  <label><Field type="radio" name="gender" value="female" /> Female</label>
</div>

{/* Checkbox Group Example */}
<div role="group">
  <label><Field type="checkbox" name="hobbies" value="coding" /> Coding</label>
  <label><Field type="checkbox" name="hobbies" value="music" /> Music</label>
</div>
```
```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ManualForm = () => {
  const formik = useFormik({
    initialValues: {
      gender: '',
      hobbies: [],
      country: '',
      terms: false,
    },
    validationSchema: Yup.object({
      gender: Yup.string().required('Required'),
      hobbies: Yup.array().min(1, 'Pick one hobby'),
      country: Yup.string().required('Required'),
      terms: Yup.oneOf([true], 'Must accept terms'),
    }),
    onSubmit: values => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      
      {/* 1. RADIO: Manual 'checked' and 'onChange' */}
      <div>
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.gender === 'male'}
        /> Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.gender === 'female'}
        /> Female
      </div>

      {/* 2. CHECKBOX GROUP: Manual array management */}
      <div>
        <label>Hobbies:</label>
        <input
          type="checkbox"
          name="hobbies"
          value="coding"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.hobbies.includes('coding')}
        /> Coding
        <input
          type="checkbox"
          name="hobbies"
          value="music"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.hobbies.includes('music')}
        /> Music
      </div>

      {/* 3. SELECT: Standard value binding */}
      <div>
        <select
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Country</option>
          <option value="usa">USA</option>
        </select>
      </div>

      {/* 4. SINGLE CHECKBOX: Boolean binding */}
      <div>
        <input
          type="checkbox"
          name="terms"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.terms}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

```
```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FullForm = () => {
  const formik = useFormik({
    initialValues: {
      gender: '',        // Radio (String)
      hobbies: [],       // Checkbox Group (Array)
      country: '',       // Select (String)
      terms: false,      // Single Checkbox (Boolean)
    },
    validationSchema: Yup.object({
      gender: Yup.string().required('Please select a gender'),
      hobbies: Yup.array().min(1, 'Select at least one hobby'),
      country: Yup.string().required('Please select a country'),
      terms: Yup.oneOf([true], 'You must accept the terms'),
    }),
    onSubmit: (values) => {
      console.log('Form Data:', values);
    },
  });

  // Helper for rendering error messages
  const renderError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors[field]}</div>
    ) : null;

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* 1. RADIO GROUP */}
      <div>
        <label><b>Gender:</b></label><br />
        <input type="radio" value="male" {...formik.getFieldProps('gender')} /> Male
        <input type="radio" value="female" {...formik.getFieldProps('gender')} /> Female
        {renderError('gender')}
      </div>

      {/* 2. CHECKBOX GROUP */}
      <div>
        <label><b>Hobbies:</b></label><br />
        <input type="checkbox" value="coding" {...formik.getFieldProps('hobbies')} /> Coding
        <input type="checkbox" value="music" {...formik.getFieldProps('hobbies')} /> Music
        <input type="checkbox" value="sports" {...formik.getFieldProps('hobbies')} /> Sports
        {renderError('hobbies')}
      </div>

      {/* 3. SELECT DROPDOWN */}
      <div>
        <label><b>Country:</b></label><br />
        <select {...formik.getFieldProps('country')}>
          <option value="">Select a country</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="ca">Canada</option>
        </select>
        {renderError('country')}
      </div>

      {/* 4. SINGLE CHECKBOX */}
      <div>
        <label>
          <input type="checkbox" {...formik.getFieldProps('terms')} />
          I accept the terms and conditions
        </label>
        {renderError('terms')}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FullForm;
```
# Yup Validation
Yup is a schema builder for runtime value parsing and validation.  
Define a schema, transform a value to match, assert the shape of an existing value, or both.   

```jsx
const personSchema = yup.object({
  firstName: yup.string(),
  nickName: yup.string().nullable(),
  email: yup
    .string()
    .nullable()
    .notRequired()
    .email(),
  birthDate: yup
    .date()
    .nullable()
    .notRequired()
    .min(new Date(1900, 0, 1)), 
  createdOn: yup.date().default(() => new Date()), 
  website: yup.string().url().nullable(), 
  age: yup.number().positive().integer().required()
});
```
#### Parsing: Transforms 
Each built-in type implements basic type parsing, which comes in handy when parsing serialized data, such as JSON.   
Additional types implement type transforms that can be enabled.  
```jsx
    const num = number().cast("1")

    const obj = object({
        firstName: string().lowercase().trim(),
    })
    .camelCase()
    .cast({"first_name": "jAnE"})  //{firstName: "jane"}
```
Custom transforms can be added:  
```jsx
const reverseString = string()
    .transform( (currentValue) => currentValue.split("").reverse().join())
    .cast("dlrow olleh")  //'hello world'
```
#### Validation: Tests
yup has robust support for assertions, or "tests", over input values.  
Tests check that inputs conform to some criteria.  
Tests are distinct from transforms, in that they do not change or alter the input (or its type) and are usually reserved for checks that are hard, if not impossible, to represent in static types.  
```jsx
string()
  .min(3, 'must be at least 3 characters long')
  .email('must be a valid email')
  .validate('no'); // ValidationError
```
As with transforms, tests can be customized on the fly  
```jsx
const jamesSchema = string().test(
    "is_james", 
    (d) => `${d.path} is not James`, 
    (value) => value === null || value === 'James'
)
jamesSchema.validateSync("James")   // "James"
jamesSchema.validateSync("Jane")   //ValidationError "this is not James"
```
#### Composition and Reuse
Schema are immutable, each method call returns a new schema object.    
Reuse and pass them around without fear of mutating another instance.

```jsx
const optionalString = string().optional();

const definedString = optionalString.defined();

const value = undefined;
optionalString.isValid(value); // true
definedString.isValid(value); // false
```
#### TypeScript integration
Yup schema produce, static TypeScript interfaces.   
Use `InferType` to extract that interface:
```jsx
import * as yup from 'yup';

const personSchema = yup.object({
  firstName: yup.string().defined(),
  nickName: yup.string().default('').nullable(),
  sex: yup
    .mixed()
    .oneOf(['male', 'female', 'other'] as const)
    .defined(),
  email: yup.string().nullable().email(),
  birthDate: yup.date().nullable().min(new Date(1900, 0, 1)),
});

interface Person extends yup.InferType<typeof personSchema> {}
```
#### Schema defaults
a schema's default is used when casting produces an `undefined` output value.
```jsx
import { string } from 'yup';

const value: string = string().default('hi').validate(undefined);

// vs

const value: string | undefined = string().validate(undefined);
```
### Schema
Is the abstract base class that all schema types inherit from.  
It provides a number of base methods and properties to all the other schema types.   
*unless you are creating a custom schema type, Schema should never be used directly. For unknown/any types use mixed()*.  
- `Schema.clone(): Schema`  
Creates a deep copy of the schema. Clone is used internally to return a new schema with every schema state change.  
- `Schema.label(label: string): Schema`  
Overrides the key name which is used in error messages.  
- `Schema.meta(metadata: object): Schema`  
Adds to a metadata object, useful for storing data with a schema, that doesn't belong the cast object itself.  
- `Schema.describe(options?: ResolveOptions): SchemaDescription`   
Collects schema details (like meta, labels, and active tests) into a serializable description object.  
```jsx
const schema = object({
  name: string().required(),
});

const description = schema.describe();
```
For schema with dynamic components (references, lazy, or conditions), describe requires more context to accurately return the schema description. In these cases provide `options`. 
```jsx
import { ref, object, string, boolean } from 'yup';

let schema = object({
  isBig: boolean(),
  count: number().when('isBig', {
    is: true,
    then: (schema) => schema.min(5),
    otherwise: (schema) => schema.min(0),
  }),
});

schema.describe({ value: { isBig: true } });
```
And below is are the description types, which differ a bit depending on the schema type.  
```jsx
interface SchemaDescription {
  type: string;
  label?: string;
  meta: object | undefined;
  oneOf: unknown[];
  notOneOf: unknown[];
  nullable: boolean;
  optional: boolean;
  tests: Array<{ name?: string; params: ExtraParams | undefined }>;

  // Present on object schema descriptions
  fields: Record<string, SchemaFieldDescription>;

  // Present on array schema descriptions
  innerType?: SchemaFieldDescription;
}

type SchemaFieldDescription =
  | SchemaDescription
  | SchemaRefDescription
  | SchemaLazyDescription;

interface SchemaRefDescription {
  type: 'ref';
  key: string;
}

interface SchemaLazyDescription {
  type: string;
  label?: string;
  meta: object | undefined;
}
```
- `Schema.concat(schema: Schema): Schema`   
Creates a new instance of the schema by combining two schemas.  
Only schemas of the same type can be concatenated.   
`concat` is not a "merge" function in the sense that all settings from the provided schema, override ones in the base, including type, presence and nullability.  
```jsx
mixed<string>().defined().concat(mixed<number>().nullable());

// produces the equivalent to:

mixed<number>().defined().nullable();
```
- `Schema.validate(value: any, options?: object): Promise<InferType<Schema>, ValidationError>`  
Returns the parses and validates an input value, returning the parsed value or throwing an error.   
This method is `asynchronous` and returns a Promise object, that is fulfilled with the value, or rejected with a `ValidationError`.  
```jsx
value = await schema.validate({ name: 'jimmy', age: 24 });
```
Provide `options` to more specifically control the behavior of `validate`.
```jsx
interface Options {
  // when true, parsing is skipped an the input is validated "as-is"
  strict: boolean = false;
  // Throw on the first error or collect and return all
  abortEarly: boolean = true;
  // Remove unspecified keys from objects
  stripUnknown: boolean = false;
  // when `false` validations will be preformed shallowly
  recursive: boolean = true;
  // External values that can be provided to validations and conditionals
  context?: object;
}
```
- `Schema.validateSync(value: any, options?: object): InferType<Schema>`  
Runs validatations synchronously if possible and returns the resulting value, or throws a ValidationError.   
Accepts all the same options as `validate`.   
Synchronous validation only works if there are no configured async tests, e.g tests that return a Promise. For instance this will work:
```jsx
let schema = number().test(
  'is-42',
  "this isn't the number i want",
  (value) => value != 42,
);

schema.validateSync(23); // throws ValidationError
```
however this will not:
```jsx
let schema = number().test('is-42', "this isn't the number i want", (value) =>
  Promise.resolve(value != 42),
);

schema.validateSync(42); // throws Error
```
- `Schema.validateAt(path: string, value: any, options?: object): Promise<InferType<Schema>, ValidationError>`  
Validate a deeply nested path within the schema. Similar to how `reach` works, but uses the resulting schema as the subject for validation.     
*The `value` here is the root value relative to the starting schema, not the value at the nested path.*
```jsx
let schema = object({
  foo: array().of(
    object({
      loose: boolean(),
      bar: string().when('loose', {
        is: true,
        otherwise: (schema) => schema.strict(),
      }),
    }),
  ),
});

let rootValue = {
  foo: [{ bar: 1 }, { bar: 1, loose: true }],
};

await schema.validateAt('foo[0].bar', rootValue); // => ValidationError: must be a string

await schema.validateAt('foo[1].bar', rootValue); // => '1'
```
- `Schema.validateSyncAt(path: string, value: any, options?: object): InferType<Schema>`  
Same as `validateAt` but synchronous.
- `Schema.isValid(value: any, options?: object): Promise<boolean>`  
Returns `true` when the passed in value matches the schema. `isValid` is `asynchronous` and returns a Promise object.   
Takes the same options as `validate()`.  
- `Schema.isValidSync(value: any, options?: object): boolean`   
Synchronously returns `true` when the passed in value matches the schema.   
Takes the same options as `validateSync()` and has the same caveats around async tests. 
- `Schema.cast(value: any, options = {}): InferType<Schema>`  
Attempts to coerce the passed in value to a value that matches the schema. For example: `'5'` will cast to `5` when using the `number()` type. Failed casts generally return `null`, but may also return results like `NaN` and unexpected strings.    
Provide `options` to more specifically control the behavior of `validate`.     
```jsx
interface CastOptions<TContext extends {}> {
  // Remove undefined properties from objects
  stripUnknown: boolean = false;

  // Throws a TypeError if casting doesn't produce a valid type
  // note that the TS return type is inaccurate when this is `false`, use with caution
  assert?: boolean = true;

  // External values that used to resolve conditions and references
  context?: TContext;
}
```
- `Schema.isType(value: any): value is InferType<Schema>`   
Runs a type check against the passed in `value`. It returns true if it matches, it does not cast the value.    
When `nullable()` is set null is considered a valid value of the type. You should use `isType` for all Schema type checks.   
- `Schema.strict(enabled: boolean = false): Schema`  
Sets the `strict` option to `true`. Strict schemas skip coercion and transformation attempts, validating the value "as is".  
- `Schema.strip(enabled: boolean = true): Schema`  
Marks a schema to be removed from an output object. Only works as a nested schema.  
```jsx
let schema = object({
  useThis: number(),
  notThis: string().strip(),
});

schema.cast({ notThis: 'foo', useThis: 4 }); // => { useThis: 4 }
```
Schema with `strip` enabled have an inferred type of `never`, allowing them to be removed from the overall type:
```jsx
let schema = object({
  useThis: number(),
  notThis: string().strip(),
});

InferType<typeof schema>; /*
{
   useThis?: number | undefined
}
*/

```
- `Schema.withMutation(builder: (current: Schema) => void): void`  
`withMutation` allows you to mutate the schema in place, instead of the default behavior which clones before each change.    
Generally this isn't necessary since the vast majority of schema changes happen during the initial declaration, and only happen once over the lifetime of the schema, so performance isn't an issue. However certain mutations do occur at cast/validation time, (such as conditional schema using `when()`), or when instantiating a schema object.  
```jsx
object()
  .shape({ key: string() })
  .withMutation((schema) => {
    return arrayOfObjectTests.forEach((test) => {
      schema.test(test);
    });
  });
```
- `Schema.default(value: any): Schema`  
Sets a default value to use when the value is `undefined`.  
Defaults are created after transformations are executed, but before validations, to help ensure that safe defaults are specified. The default value will be cloned on each use, which can incur performance penalty for objects and arrays.  
To avoid this overhead you can also pass a function that returns a new default. Note that `null` is considered a separate non-empty value.  
```jsx
yup.string.default('nothing');

yup.object.default({ number: 5 }); // object will be cloned every time a default is needed

yup.object.default(() => ({ number: 5 })); // this is cheaper

yup.date.default(() => new Date()); // also helpful for defaults that change over time
```
- `Schema.getDefault(options?: object): Any`  
Retrieve a previously set default value. `getDefault` will resolve any conditions that may alter the default. Optionally pass `options` with context.   
- `Schema.nullable(): Schema`  
Indicates that `null` is a valid value for the schema. Without `nullable()` null is treated as a different type and will fail `Schema.isType()` checks.
```jsx
const schema = number().nullable()

schema.cast(null); // null

InferType<typeof schema> // number | null
```
- `Schema.nonNullable(): Schema`  
The opposite of `nullable`, removes `null` from valid type values for the schema. `Schema are non nullable by default`.  
```jsx
const schema = number().nonNullable()

schema.cast(null); // TypeError

InferType<typeof schema> // number
```
- `Schema.defined(): Schema`  
Require a value for the schema. All field values apart from `undefined` meet this requirement.  
```jsx
const schema = string().defined()

schema.cast(undefined); // TypeError

InferType<typeof schema> // string
```
- `Schema.optional(): Schema`  
The opposite of `defined()` allows undefined values for the given type.  
```jsx
const schema = string().optional()

schema.cast(undefined); // undefined

InferType<typeof schema> // string | undefined
```
- `Schema.required(message?: string | function): Schema`  
Mark the schema as required, which will not allow `undefined` or `null` as a value. `required` negates the effects of calling `optional()` and `nullable()`.    
* `string().required` works a little different and additionally prevents empty string values ('') when required.*
- `Schema.notRequired(): Schema Alias: optional()`  
Mark the schema as not required. This is a shortcut for `schema.nonNullable().defined();`  
- `Schema.typeError(message: string): Schema`  
Define an error message for failed type checks. The `${value}` and `${type}` interpolation can be used in the `message` argument.  
- `Schema.oneOf(arrayOfValues: Array<any>, message?: string | function): Schema Alias: equals`  
Only allow values from set of values. Values added are removed from any `notOneOf` values if present. The `${values}` interpolation can be used in the message argument. If a ref or refs are provided, the `${resolved}` interpolation can be used in the message argument to get the resolved values that were checked at validation time.  
Note that `undefined` does not fail this validator, even when `undefined` is not included in `arrayOfValues`. If you don't want `undefined` to be a valid value, you can use `Schema.required`.    
```jsx
let schema = yup.mixed().oneOf(['jimmy', 42]);

await schema.isValid(42); // => true
await schema.isValid('jimmy'); // => true
await schema.isValid(new Date()); // => false
```
- `Schema.notOneOf(arrayOfValues: Array<any>, message?: string | function)`  
Disallow values from a set of values. Values added are removed from `oneOf` values if present. The `${values}` interpolation can be used in the `message` argument. If a ref or refs are provided, the `${resolved}` interpolation can be used in the message argument to get the resolved values that were checked at validation time.  
```jsx
let schema = yup.mixed().notOneOf(['jimmy', 42]);

await schema.isValid(42); // => false
await schema.isValid(new Date()); // => true
```
- `Schema.when(keys: string | string[], builder: object | (values: any[], schema) => Schema): Schema`  
Adjust the schema based on a sibling or sibling children fields. You can provide an object literal where the key `is` is value or a matcher function, `then` provides the true schema and/or `otherwise` for the failure condition.  
`is` conditions are strictly compared `(===)` if you want to use a different form of equality you can provide a function like: `is: (value) => value == true`.    
You can also prefix properties with `$` to specify a property that is dependent on `context` passed in by `validate()` or `cast` instead of the input value.    
`when` conditions are additive.
```jsx
let schema = object({
  isBig: boolean(),
  count: number()
    .when('isBig', {
      is: true, // alternatively: (val) => val == true
      then: (schema) => schema.min(5),
      otherwise: (schema) => schema.min(0),
    })
    .when('$other', ([other], schema) =>
      other === 4 ? schema.max(6) : schema,
    ),
});

await schema.validate(value, { context: { other: 4 } });
```
You can also specify more than one dependent key, in which case each value will be spread as an argument.  
```jsx
let schema = object({
  isSpecial: boolean(),
  isBig: boolean(),
  count: number().when(['isBig', 'isSpecial'], {
    is: true, // alternatively: (isBig, isSpecial) => isBig && isSpecial
    then: (schema) => schema..min(5),
    otherwise: (schema) => schema..min(0),
  }),
});

await schema.validate({
  isBig: true,
  isSpecial: true,
  count: 10,
});
```
Alternatively you can provide a function that returns a schema, called with an array of values for each provided key the current schema.  
```jsx
let schema = yup.object({
  isBig: yup.boolean(),
  count: yup.number().when('isBig', ([isBig], schema) => {
    return isBig ? schema.min(5) : schema.min(0);
  }),
});

await schema.validate({ isBig: false, count: 4 });
```
- `Schema.test(name: string, message: string | function | any, test: function): Schema`  
Adds a test function to the validation chain. Tests are run after any object is cast. Many types have some tests built in, but you can create custom ones easily. In order to allow asynchronous custom validations all (or no) tests are run asynchronously. A consequence of this is that test execution order cannot be guaranteed.  
All tests must provide a `name`, an error `message` and a validation function that must return true when the current `value` is valid and false or a `ValidationError` otherwise. To make a test async return a promise that resolves `true` or `false` or a `ValidationError`.     
For the `message` argument you can provide a string which will interpolate certain values if specified using the `${param}` syntax. By default all test messages are passed a `path` value which is valuable in nested schemas.  
The `test` function is called with the current `value`. For more advanced validations you can use the alternate signature to provide more options:  
```jsx
let jimmySchema = string().test(
  'is-jimmy',
  '${path} is not Jimmy',
  (value, context) => value === 'jimmy',
);

// or make it async by returning a promise
let asyncJimmySchema = string().test(
  'is-jimmy',
  '${path} is not Jimmy',
  async (value, testContext) => (await fetch('/is-jimmy/' + value)).responseText === 'true',
});

await schema.isValid('jimmy'); // => true
await schema.isValid('john'); // => false
```
Test functions are called with a special context value, as the second argument, that exposes some useful metadata and functions. For non arrow functions, the test context is also set as the function this. Watch out, if you access it via this it won't work in an arrow function.    
  - testContext.path: the string path of the current validation
  - testContext.schema: the resolved schema object that the test is running against.
  - testContext.options: the `options` object that validate() or isValid() was called with
  - testContext.parent: in the case of nested schema, this is the value of the parent object
  - testContext.originalValue: the original value that is being tested
  - testContext.createError(Object: { path: String, message: String, params: Object }): create and return a validation error. Useful for dynamically setting the `path`, `params`, or more likely, the error `message`. If either option is omitted it will use the current path, or default message.

- `Schema.test(options: object): Schema`  
Alternative `test(..)` signature. `options` is an object containing some of the following options:  
```jsx
Options = {
  // unique name identifying the test
  name: string;
  // test function, determines schema validity
  test: (value: any) => boolean;
  // the validation error message
  message: string;
  // values passed to message for interpolation
  params: ?object;
  // mark the test as exclusive, meaning only one test of the same name can be active at once
  exclusive: boolean = false;
}
```
In the case of mixing exclusive and non-exclusive tests the following logic is used. If a non-exclusive test is added to a schema with an exclusive test of the same name the exclusive test is removed and further tests of the same name will be stacked.  
If an exclusive test is added to a schema with non-exclusive tests of the same name the previous tests are removed and further tests of the same name will replace each other.   
```jsx
let max = 64;
let schema = yup.string().test({
  name: 'max',
  exclusive: true,
  params: { max },
  message: '${path} must be less than ${max} characters',
  test: (value) => value == null || value.length <= max,
});
```
- `Schema.transform((currentValue: any, originalValue: any) => any): Schema`  
Adds a transformation to the transform chain. Transformations are central to the casting process, default transforms for each type coerce values to the specific type (as verified by `isType()`). transforms are run before validations and only applied when the schema is not marked as `strict` (the default). Some types have built in transformations.  
Transformations are useful for arbitrarily altering how the object is cast, **however, you should take care not to mutate the passed in value**. Transforms are run sequentially so each `value` represents the current state of the cast, you can use the `originalValue` param if you need to work on the raw initial value.   
```jsx
let schema = string().transform((value, originalvalue) => {
  return this.isType(value) && value !== null ? value.toUpperCase() : value;
});

schema.cast('jimmy'); // => 'JIMMY'
```
Each types will handle basic coercion of values to the proper type for you, but occasionally you may want to adjust or refine the default behavior. For example, if you wanted to use a different date parsing strategy than the default one you could do that with a transform.  
```jsx
module.exports = function (formats = 'MMM dd, yyyy') {
  return date().transform((value, originalValue, context) => {
    // check to see if the previous transform already parsed the date
    if (context.isType(value)) return value;

    // the default coercion failed so let's try it with Moment.js instead
    value = Moment(originalValue, formats);

    // if it's valid return the date object, otherwise return an `InvalidDate`
    return value.isValid() ? value.toDate() : new Date('');
  });
};
```
# Types
## mixed 
Creates a schema that matches all types, or just the ones you configure. Inherits from `Schema`.  
```jsx
import { mixed, InferType } from 'yup';

let schema = mixed();

schema.validateSync('string'); // 'string';

schema.validateSync(1); // 1;

schema.validateSync(new Date()); // Date;

InferType<typeof schema> // any
```
Custom types can be implemented by passing a type check function.   
```jsx
import { mixed, InferType } from 'yup';

let objectIdSchema = yup
  .mixed((input): input is ObjectId => input instanceof ObjectId)
  .transform((value: any, input, ctx) => {
    if (ctx.typeCheck(value)) return value;
    return new ObjectId(value);
  });

await objectIdSchema.validate(ObjectId('507f1f77bcf86cd799439011')); // ObjectId("507f1f77bcf86cd799439011")

await objectIdSchema.validate('507f1f77bcf86cd799439011'); // ObjectId("507f1f77bcf86cd799439011")


InferType<typeof objectIdSchema> // ObjectId
```
## string
Define a string schema. Inherits from `Schema`.  
```jsx
let schema = yup.string()
await schema.isValid("Hello"); // => true
```
By default the `cast` logic is to call `toString` on the value if it exists.   
empty values are not coerced (use `ensure()` to coerce empty values to empty strings).  
Failed casts return the input value.  
#### string.required(message?: string | function): Schema  
The same as the `mixed()` schema required, except empty strings are also considered empty values.   
#### string.length(limit: number | Ref, message?: string | function): Schema  
Set a required length for the string value. The `${length}` interpolation can be used in the `message` argument   
#### string.min(limit: number | Ref, message?: string | function): Schema  
Set a minimum length limit for the string value. The `${min}` interpolation can be used in the `message` argument  
#### string.max(limit: number | Ref, message?: string | function): Schema
Set a maximum length limit for the string value. The `${max}` interpolation can be used in the `message` argument  
#### string.matches(regex: Regex, message?: string | function): Schema  
Provide an arbitrary `regex` to match the value against  
```jsx
let schema = string().matches(/(hi|bye)/);

await schema.isValid('hi'); // => true
await schema.isValid('nope'); // => false
```
#### string.matches(regex: Regex, options: { message: string, excludeEmptyString: bool }): Schema  
An alternate signature for `string.matches` with an options object. `excludeEmptyString`, when true, short circuits the regex test when the value is an empty string    
```jsx
 let schema = string().matches(/(hi|bye)/, { excludeEmptyString: true });

await schema.isValid(''); // => true 
```
#### string.email(message?: string | function): Schema  
Validates the value as an email address via a regex.  
#### string.url(message?: string | function): Schema  
Validates the value as a valid URL via a regex.  
#### string.uuid(message?: string | function): Schema  
Validates the value as a valid UUID via a regex.  
#### string.ensure(): Schema  
Transforms `undefined` and `null` values to an empty string along with setting the `default` to an empty string.  
#### string.trim(message?: string | function): Schema  
Transforms string values by removing leading and trailing whitespace. If `strict()` is set it will only validate that the value is trimmed. 
#### string.lowercase(message?: string | function): Schema   
Transforms the string value to lowercase. If `strict()` is set it will only validate that the value is lowercase.  
## number
Define a number schema. Inherits from `Schema`.
```jsx
let schema = yup.number();

await schema.isValid(10); // => true
```
The default `cast` logic of `number` is: `parseFloat`.    
Failed casts return `NaN`.  
#### number.min(limit: number | Ref, message?: string | function): Schema  
Set the minimum value allowed. The `${min}` interpolation can be used in the `message` argument.  
#### number.max(limit: number | Ref, message?: string | function): Schema  
Set the maximum value allowed. The `${max}` interpolation can be used in the `message` argument.   
#### number.lessThan(max: number | Ref, message?: string | function): Schema  
Value must be less than max. The `${less}` interpolation can be used in the `message` argument.  
#### number.moreThan(min: number | Ref, message?: string | function): Schema  
Value must be strictly greater than `min`. The `${more}` interpolation can be used in the message argument.  
#### number.positive(message?: string | function): Schema  
Value must be a positive number.  
#### number.negative(message?: string | function): Schema  
Value must be a negative number.  
#### number.integer(message?: string | function): Schema  
Validates that a number is an integer.  
#### number.truncate(): Schema  
Transformation that coerces the value to an integer by stripping off the digits to the right of the decimal point.  
#### number.round(type: 'floor' | 'ceil' | 'trunc' | 'round' = 'round'): Schema  
Adjusts the value via the specified method of `Math` (defaults to 'round').  
## boolean
Define a boolean schema. Inherits from `Schema`.  
```jsx
let schema = yup.boolean();

await schema.isValid(true); // => true  
```
The default `cast` logic of date is pass the value to the `Date` constructor, failing that, it will attempt to parse the date as an ISO date string.   
Failed casts return an invalid Date.  
#### date.min(limit: Date | string | Ref, message?: string | function): Schema  
Set the minimum date allowed. When a string is provided it will attempt to cast to a date first and use the result as the limit.  
#### date.max(limit: Date | string | Ref, message?: string | function): Schema  
Set the maximum date allowed, When a string is provided it will attempt to cast to a date first and use the result as the limit.  
## array
Define an array schema. Arrays can be typed or not, When specifying the element type, `cast` and `isValid` will apply to the elements as well.     
Options passed into `isValid` are passed also passed to child schemas.  
Inherits from `Schema`. 
```jsx
let schema = yup.array().of(yup.number().min(2));

await schema.isValid([2, 3]); // => true
await schema.isValid([1, -24]); // => false

schema.cast(['2', '3']); // => [2, 3]
```
You can also pass a subtype schema to the array constructor as a convenience.  
```jsx
array().of(yup.number());
// or
array(yup.number());
```
Arrays have no default casting behavior.  
#### array.of(type: Schema): this  
Specify the schema of array elements. `of()` is optional and when omitted the array schema will not validate its contents.  
#### array.json(): this  
Attempt to parse input string values as JSON using `JSON.parse`.  
#### array.length(length: number | Ref, message?: string | function): this  
Set a specific length requirement for the array. The `${length}` interpolation can be used in the `message` argument.  
#### array.min(limit: number | Ref, message?: string | function): this  
Set a minimum length limit for the array. The `${min}` interpolation can be used in the `message` argument.  
#### array.max(limit: number | Ref, message?: string | function): this  
Set a maximum length limit for the array. The `${max}` interpolation can be used in the `message` argument.    
#### array.ensure(): this  
Ensures that the value is an array, by setting the default to `[]` and transforming `null` and `undefined` values to an empty array as well. Any non-empty, non-array value will be wrapped in an array.   
```jsx
array().ensure().cast(null); // => []
array().ensure().cast(1); // => [1]
array().ensure().cast([1]); // => [1]  
```
#### array.compact(rejector: (value) => boolean): Schema  
Removes falsey values from the array. Providing a rejecter function lets you specify the rejection criteria yourself.  
```jsx
array().compact().cast(['', 1, 0, 4, false, null]); // => [1, 4]

array()
  .compact(function (v) {
    return v == null;
  })
  .cast(['', 1, 0, 4, false, null]); // => ['', 1, 0, 4, false]
```
## tuple
Tuples, are fixed length arrays where each item has a distinct type.  
Inherits from `Schema`.  
```jsx
import { tuple, string, number, InferType } from 'yup';

let schema = tuple([
  string().label('name'),
  number().label('age').positive().integer(),
]);

await schema.validate(['James', 3]); // ['James', 3]

await schema.validate(['James', -24]); // => ValidationError: age must be a positive number

InferType<typeof schema> // [string, number] | undefined
```
tuples have no default casting behavior.  
## object
Define an object schema. Options passed into `isValid` are also passed to child schemas. Inherits from `Schema`.  
```jsx
yup.object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url(),
});
```
object schema do not have any default transforms applied.  
### Object Schema Defaults
Object schema come with a default value already set, which "builds" out the object shape, a sets any defaults for fields:  
```jsx
const schema = object({
  name: string().default(''),
});

schema.default(); // -> { name: '' }
```
This may be a bit suprising, but is usually helpful since it allows large, nested schema to create default values that fill out the whole shape and not just the root object.  
There is one gotcha! though. For nested object schema that are optional but include non optional fields may fail in unexpected ways:  
```jsx
const schema = object({
  id: string().required(),
  names: object({
    first: string().required(),
  }),
});

schema.isValid({ id: 1 }); // false! names.first is required  
```
This is because yup casts the input object before running validation which will produce:  
```js
{ id: '1', names: { first: undefined }}
```
During the validation phase `names` exists, and is validated, finding `names.first` missing. If you wish to avoid this behavior do one of the following:  
- Set the nested default to undefined: `names.default(undefined)`
- mark it nullable and default to null: `names.nullable().default(null)`  

#### object.shape(fields: object, noSortEdges?: Array<[string, string]>): Schema  
Define the keys of the object and the schemas for said keys.  
Note that you can chain `shape` method, which acts like `Object.assign`.  
```jsx
object({
  a: string(),
  b: number(),
}).shape({
  b: string(),
  c: number(),
});
```
#### object.json(): this
Attempt to parse input string values as JSON using `JSON.parse`.   
#### object.concat(schemaB: ObjectSchema): ObjectSchema  
Creates a object schema, by applying all settings and fields from `schemaB` to the base, producing a new schema. The object shape is shallowly merged with common fields from `schemaB` taking precedence over the base fields.  
#### object.pick(keys: string[]): Schema
Create a new schema from a subset of the original's fields.  
```jsx
const person = object({
  age: number().default(30).required(),
  name: string().default('pat').required(),
  color: string().default('red').required(),
});

const nameAndAge = person.pick(['name', 'age']);
nameAndAge.getDefault(); // => { age: 30, name: 'pat'}
```
#### object.omit(keys: string[]): Schema
Create a new schema with fields omitted.  
```jsx
const person = object({
  age: number().default(30).required(),
  name: string().default('pat').required(),
  color: string().default('red').required(),
});

const nameAndAge = person.omit(['color']);
nameAndAge.getDefault(); // => { age: 30, name: 'pat'}
```
#### object.from(fromKey: string, toKey: string, alias: boolean = false): this  
Transforms the specified key to a new key. If `alias` is `true` then the old key will be left.  
```jsx
let schema = object({
  myProp: mixed(),
  Other: mixed(),
})
  .from('prop', 'myProp')
  .from('other', 'Other', true);

schema.cast({ prop: 5, other: 6 }); // => { myProp: 5, other: 6, Other: 6 }
```
#### object.noUnknown(onlyKnownKeys: boolean = true, message?: string | function): Schema  
Validate that the object value only contains keys specified in `shape`, pass `false` as the first argument to disable the check.   
Restricting keys to known, also enables `stripUnknown` option, when not in strict mode.  
#### object.camelCase() : Schema
Transforms al objects to camelCase.  
#### object.constantCase() : Schema
Transforms all objects to CONSTANT_CASE.  


