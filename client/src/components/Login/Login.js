import './login.css'
import { Redirect } from 'react-router-dom'
import React, { useState } from 'react'
import { user } from '../../services/userService'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function login () {
    return user.auth(username, password, ({ err }) => {
      if (err) alert(err)
      else return (<Redirect to="/app" />)
    })
  }
  function signUp () {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err)
      } else {
        login()
      }
    })
  }

  function onUpdateUsername (e) {
    e.preventDefault()
    setUsername(e.target.value)
  }
  function onUpdatePasword (e) {
    e.preventDefault()
    setPassword(e.target.value)
    return <Redirect to="/app" />
  }
  return (
    <div className="LoginPage">
      <h1>Create/Login</h1>
        <div>
          <label htmlFor="uname">Username</label>
          <input type="text" placeholder="Enter Username" name="uname" value={username} onChange={onUpdateUsername} required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" name="password" value={password} onChange={onUpdatePasword} required/>
        </div>
        <button onClick={login}>Login</button>
        <button onClick={signUp}>Register</button>
    </div>
  )
}

export default Login
