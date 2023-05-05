import ReactDOM from 'react-dom/client'
import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(counter - 1)}>minus</button>
      <button onClick={() => setCounter(0)}>zero</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
