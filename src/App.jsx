import { useEffect, useState } from 'react'
import './App.css'
import {format} from 'date-fns'
import Parent from "./Parent.jsx"
import Children from './Children.jsx'
import UserProvider from "./Context";


function App() {
  return (
    <>
      <UserProvider>
      <Parent/>
      <Children/>
      </UserProvider>

    </>
  )
}

export default App
