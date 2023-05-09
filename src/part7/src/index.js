import ReactDOM from 'react-dom/client'
import { useCounter } from './hooks/useCounter'
import { useField } from './hooks/useField'

const App = () => {
  /* const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>plus</button>
      <button onClick={counter.decrease}>minus</button>
      <button onClick={counter.zero}>zero</button>
    </div>
  ) */
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input {...name} />
        birthdate:
        <input {...born} />
        height:
        <input {...height} />
      </form>
      {name.value} {born.value} {height.value}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
