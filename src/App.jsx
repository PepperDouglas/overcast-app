import { useState } from 'react'
import { ContextProvider } from './contexts/ContextProvider';
import TopBar from './components/TopBar'
import './App.css'


function App() {
  //Get geolocation here or something
  const city = "Stockholm";

  //App should make the request and send the data down??

  return (
    <>
      <ContextProvider>
        <TopBar city={city}></TopBar>
      </ContextProvider>
    </>
  )
}

export default App
