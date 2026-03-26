**Controlled Form**: a form that derives its input values from state.  
To completely control a form, we also need our form to update state.  


For the case of a form:
```jsx
import { useState } from "react";

function Form () {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [approved, setApproved] = useState(true)
    function handleSubmit(e) {
            e.preventDefault()
            const formData = {
                name, 
                password,
                approved
            }
            console.log(formData)
    }
    return(
    <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input id="name"type="text" placeholder="Type your name" value={name} onChange={(e) => setName(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input name="password" type="text" value={password} onChange={e => setPassword(e.target.value)}/>

        <label htmlFor="checked">Receive weekly emails</label>
        <input name="checked" type="checkbox" checked={approved} onChange={e => setApproved(e.target.checked)}/>

        <button type="submit">Submit</button>
    </form>
    )
}
export default Form;
```
You may notice the perks of using state; There is no need to deal with the ``e.target.**`` when accessing a value for logging or setting state.  


### Input Id Vs Name
##### Id(For Labels)
The ``htmlFor`` attribute on a ``<label>`` must match the id of an ``<input>``. This is what creates the "link" between them.
`Accessibility`: Screen readers use this link to tell a user what a specific input is for.  
`UX Benefit`: When a user clicks the text of the label, the browser automatically focuses the input or toggles the checkbox.  
`Uniqueness`: An id must be unique on the entire page.  
##### Name(For Data)
The name attribute is used to identify the data when a form is submitted.
`Form Submission`: When you submit a form via a standard HTTP request, the browser sends the data as name=value.  
`Radio Groups`: For radio buttons, the name is what groups them together so that only one can be selected at a time.  
`React State`: Developers often use the name attribute in a single onChange handler to determine which piece of state to update.  

**Pro Tip**: In React, if you don't want to worry about matching IDs, you can wrap the input inside the label. This implicitly links them without needing htmlFor or id at all:
```jsx
<label>Email <input type="email" /></label>
```

#### Form improvement Logic
```jsx
import { useState } from "react";

function Form () {
    const [formData, setFormData] = useState({
        name: "", 
        password: "", 
        approved: true
    })
    function handleSubmit(e) {
            e.preventDefault()
            console.log(formData)
    }
    return(
    <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input id="name"type="text" placeholder="Type your name" value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value})}/>

        <label htmlFor="password">Password</label>
        <input name="password" type="text" value={formData.password} onChange={e => setFormData({...formData, password:e.target.value})}/>

        <label htmlFor="checked">Receive weekly emails</label>
        <input name="checked" type="checkbox" checked={formData.approved} onChange={e => setFormData({...formData, checked:e.target.checked})}/>

        <button type="submit">Submit</button>
    </form>
    )
}
export default Form;
```
Or even properly abstracted;
```jsx
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
```
# Bonus(Search and Options Combo)
```jsx
import {useState} from "react"
function Output () {
    const allAnimals = [
        {id: 1, name: "Kexxy", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "tamed"},
        {id: 2, name: "Kexxy", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "domesticated"},
        {id: 3, name: "Keziah", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "tamed"},
        {id: 4, name: "Chihuahua", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "trained"},
        {id: 5, name: "Bosko", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "domesticated"},
        {id: 6, name: "Scoobs", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "orphanage"},
        {id: 7, name: "Scott", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "domesticated"},
        {id: 8, name: "Mumu", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "trained"},
        {id: 9, name: "Lobo", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "trained"},
        {id: 10, name: "Frenshy", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "orphanage"},
        {id: 11, name: "Loan", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "trained"},
        {id: 12, name: "Momo", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "tamed"},
        {id: 13, name: "Cuty Patootie", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "tamed"},
        {id: 14, name: "Unc", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvJsmJwmWUqdtfKDIoyLTCy-tStuJRs4nJQ&s",type: "orphanage"},
    ]    
    const [filterValue, setFilterValue] = useState("all")
    const [search, setSearch] = useState("")
    console.log(search)
    function handleFilter(value) {
        setFilterValue(value)
    }
    //if the values are limited use below. If massive, use the revamped version below it.
    // const updatedArr = allAnimals
    // .filter(animal => filterValue === "all"? true : animal.type === filterValue)
    // .filter(animal => animal.name.includes(search))
    const updatedArr = allAnimals.filter(animal => {
        const matchingCategory = filterValue === "all"? true : animal.type === filterValue 
        const matching = animal.name.includes(search)
        return matchingCategory && matching
    })
    return (
        <>
            <select name="animals" id="values" onChange={ (e) => handleFilter(e.target.value)}>
                <option value="all">All</option>         
                <option value="tamed">Tamed</option>                
                <option value="domesticated">Domesticated</option>                
                <option value="orphanage">Orphanage</option>                
            </select>
            <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div id="animal-list">
            {updatedArr.map(animal => (
                <div key={animal.id}>
                    <h1>{animal.name}</h1>
                    <img src={animal.imgUrl} alt="{animal.name}" />
                    <h3>{animal.type}</h3>
                </div>
            ))}
            </div>
        </>
    )
}

export default Output;
```