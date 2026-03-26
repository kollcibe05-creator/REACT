import { useState } from "react";

function Form () {
    const [formData, setFormData] = useState({
        name: "", 
        password: "", 
        approved: true
    })
    function handleChange (e){
        setFormData({
            ...formData, 
            [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }) 
    } 
    function handleSubmit(e) {
            e.preventDefault()
            console.log(formData)
    }
    return(
    <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Type your name" value={formData.name} onChange={(e) => handleChange(e)}/>

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" value={formData.password} onChange={e => handleChange(e)}/>

        <label htmlFor="checked">Receive weekly emails</label>
        <input id="approved" name="checked" type="checkbox" checked={formData.approved} onChange={e => handleChange(e)}/>

        <button type="submit">Submit</button>
    </form>
    )
}
export default Form;