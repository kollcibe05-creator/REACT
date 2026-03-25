import { useEffect, useState } from 'react'
import './App.css'
import {format} from 'date-fns'
// import { setDate } from 'date-fns'

function App() {

    const [count, setCount] = useState(Number(20))
    
    useEffect (() => {
      if (count === 0) {
      setCount(20)
      return 
    } 
     const timeId = setInterval(() => {
        setCount((count) => Number(count)-1)
      }, 1000 )
      return () => clearInterval(timeId)
    })
  return (
    <>
      {/* <p>{count}</p> */}
    </>
  )
}

export default App
