import { use, useEffect, useState } from "react"

function UseEffect () {
    const [time, setTime] = useState(new Date().toLocaleString())
    const [count, setCount] = useState(1)
    const [countDown, setCountDown] = useState(20)
    useEffect(() => {
       
        const timeId = setTimeout(() => setTime(new Date ().toLocaleString()), 1000)
        return function () {
            clearTimeout(timeId) //cleanup function
        }

        
    })
    return (
        <>
         <p>{time}</p>
        </>
    )
    // ,[count]
}
export default UseEffect;