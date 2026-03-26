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