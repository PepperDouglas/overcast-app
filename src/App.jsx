import { useState } from 'react'
import { ContextProvider } from './contexts/ContextProvider';
import TopBar from './components/TopBar'
import './App.css'


function App() {
  //Get geolocation here or something
  const startCity = "Stockholm";

  //App should make the request and send the data down??

  return (
    <>
      <ContextProvider>
        <TopBar cityprop={startCity}></TopBar>
      </ContextProvider>
    </>
  )
}

export default App
