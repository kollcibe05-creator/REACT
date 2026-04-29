import React, { useState } from "react"
import {useFormik, Formik, ErrorMessage, Field, Form} from "formik"

// const Basic = () => (
//     <div>
//         <h1>Revamp edition</h1>
//         <Formik
//             initialValues = {{email: "", password: ""}}
//             validate = {values => {
//                 const errors = {}
//                 if (!values.email) {
//                     errors.email = 'Required';
//                 } else if (
//                 !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                 ) {
//                 errors.email = 'Invalid email address';
//                 }
//                 return errors;
//             }}
//             onSubmit = {
//                 (values, {setSubmitting}) => {
//                     setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                     setSubmitting(false);
//                     }, 400);
//                 }
//             }
//         >
//         {({isSubmitting}) => (
//             <Form>
//                 <Field type="email" name="email"/>
//                 <ErrorMessage name="email" component="div"/>
//                 <Field type="password" name="password"/>
//                 <ErrorMessage name="password" component="div"/>
//                 <button type="submit"disabled={isSubmitting}>Submit</button>
//             </Form>
//         )}
//         </Formik>
//     </div>
// )



// const Basic = () => (
//     <div>
//         <h1>Anywhere.</h1>    
//         <Formik
//             initialValues = {{email: "", password: ""}}
//             validate = {values => {
//                 const errors = {}
//                 if (!values.email) {
//                     errors.email = "Required"
//                 } else if (!/^[A-Z0-9._%+@-]+\.[A-Z]{2,}$/i.test(values.email)) {
//                     errors.email = "Invalid email address."
//                 }
//                 return errors
//             }}
//             onSubmit = {(values, {setSubmitting}) => {   
//                 //  onSubmit={(values, { setSubmitting }) => {
//                 // setTimeout(() => {
//                 //     alert(JSON.stringify(values, null, 2));
//                 //     setSubmitting(false);
//                 //     }, 400);
//                 fetch("api/posts", {
//                     method: "POST", 
//                     headers: {'Content-Type': "application/json"}, 
//                     body: JSON.stringify(values)
//                 })
//                 .then(r => r.json())
//                 .then(data => {
//                     setSubmitting(false)
//                     setData(data)
//                 })
//             }} 
//         >        
//         {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
//             <form>
//                 <input 
//                    type="email"
//                    name="email"
//                    onChange={handleChange}
//                    onBlur={handleBlur}
//                    value={values.email}
//                 />           
//                 {errors.email && touched.email && errors.email}
//                 <input
//                     type="password"
//                     name="password"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.password}
//                 />
//                 {errors.password && touched.password && errors.password}
                
//                 <button type="submit" disabled={isSubmitting}>Submit</button>

//             </form>   
//         )}
//         </Formik>
//     </div>
//     )



// function Form () {
//     const [email, setEmail] = useState("")
//     const [selectValue, setSelectValue] = useState("me")
//     const [checkboxValue, setcheckboxValue] = useState([])
//     function handleSelect (e) {
//         setSelectValue(e.target.value)
//     }
//     function handleSubmit (e) {
//         e.preventDefault()
//         console.log({
//             email,
//             selectValue, 
//             checkboxValue
//         })
//     }
//     function handleEmailChange(e) {
//         setEmail(e.target.value)
//     }
//     function handlecheckboxChange (e)  {
//         if (checkboxValue.includes(e.target.value)) {
//             const newValues = checkboxValue.filter( value => value === e.target.value)
//             setcheckboxValue(newValues)
//         }
//         setcheckboxValue(checkboxValue => [... checkboxValue, e.target.value])
//     }
//     return (
//         <form onSubmit={handleSubmit}>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" placeholder="Enter your email" value = {email} onChange={handleEmailChange}/>
                                
//                  <label htmlFor="values">Whose the Best?</label>               
//                  <select name="values" id="values" onChange={handleSelect}>
//                     <option value="me">Me</option>
//                     <option value="you">You</option>
//                     <option value="charlie">Charlie</option>
//                     <option value="lucie">Lucie</option>
//                     <option value="brian">Brian</option>
//                  </select>

//                     <label htmlFor="dishes">Pick Your Dish</label>
                    
//                     <label htmlFor="cookies">Cookies</label>
//                     <input type="checkbox" name="dishes" value="cookies" checked={checkboxValue.includes("cookies")}onChange={handlecheckboxChange}/>

//                     <label htmlFor="pasta">Pasta</label>
//                     <input type="checkbox" name="dishes" value="pasta" onChange={handlecheckboxChange} checked={checkboxValue.includes("pasta")}/>
                    
//                     <label htmlFor="shrimps">Shrimps</label>
//                     <input type="checkbox" name="dishes" value="shrimps" onChange={handlecheckboxChange} checked={checkboxValue.includes("shrimps")}/>
                    
//                     <label htmlFor="ugali">Ugali</label>
//                     <input type="checkbox" name="dishes" value="ugali"  onChange={handlecheckboxChange} checked={checkboxValue.includes("ugali")}/>



//                 <label><input type="submit"/>Submit</label>

//         </form>
//     )
// }
function Basic () {
    const formik = useFormik({
        initialValues: {email: '', checked: false, selected: "you", radio: ""}, 
        onSubmit: values => {
            console.log(values)
        }
    })
    return (
        <>
        <h1>Working On it</h1>
        <form onSubmit={formik.handleSubmit}>
                 <label htmlFor="email">Email</label>
                   <input type="email" name="email"placeholder="Enter your email" value = {formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                
                    <label htmlFor="selected">Whose the Best?</label>               
                    <select name="selected" id="selected" onChange={formik.handleChange}>
                       <option value="me">Me</option>
                       <option value="you">You</option>
                       <option value="charlie">Charlie</option>
                       <option value="lucie">Lucie</option>
                       <option value="brian">Brian</option>
                    </select>

                <label htmlFor="checked">Like That?</label>    
                <input type="checkbox" name="checked" checked={formik.values.checked} name="checked" onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                    <label htmlFor="dishes">Pick Your Dish</label>
                    
                     <label htmlFor="cookies">Cookies</label>
                     <input type="checkbox" name="dishes" value="cookies" checked={checkboxValue.includes("cookies")}onChange={handlecheckboxChange}/>
                     <label htmlFor="pasta">Pasta</label>
                     <input type="checkbox" name="dishes" value="pasta" onChange={handlecheckboxChange} checked={checkboxValue.includes("pasta")}/>
                  
                     <label htmlFor="shrimps">Shrimps</label>
                     <input type="checkbox" name="dishes" value="shrimps" onChange={handlecheckboxChange} checked={checkboxValue.includes("shrimps")}/>
                  
                     <label htmlFor="ugali">Ugali</label>
                     <input type="checkbox" name="dishes" value="ugali"  onChange={handlecheckboxChange} checked={checkboxValue.includes("ugali")}/>

               
                <label><input type="submit"/>Submit</label>
        </form>
        </>
    )
}
export default Basic