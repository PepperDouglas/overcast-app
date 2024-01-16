import { ContextProvider } from './contexts/ContextProvider';
import TopBar from './components/TopBar'
import './App.css'


function App() {
  const startCity = "Stockholm";

  return (
    <>
      <ContextProvider>
        <TopBar cityprop={startCity}></TopBar>
      </ContextProvider>
    </>
  )
}

export default App
