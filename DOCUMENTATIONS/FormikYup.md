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
