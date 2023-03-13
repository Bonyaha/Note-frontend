import { useState } from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    try {
      handleLogin(username, password)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
    }
  }
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
