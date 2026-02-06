import { useState } from 'react'
import './App.css'
import LifeCycle from './LifeCycle'

function App() {
  const [count, setCount] = useState(0)

  const handleLifeCycleIncrement = (newCount: number) => {
    console.log('Parent component received new count:', newCount);
  }

  return (
    <>
      <LifeCycle initialCount={0} onIncrement={handleLifeCycleIncrement} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
