import { useState } from 'react'
import TopBar from './components/TopBar'
import './App.css'


function App() {
  //Get geolocation here or something
  const city = "Stockholm";

  return (
    <>
      <TopBar city={city}></TopBar>
    </>
  )
}

export default App
