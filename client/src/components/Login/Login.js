import './login.css';
import { Redirect, withRouter } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import { user } from '../../services/userService';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);

  function login () {
    return user.auth(username, password, ({ err }) => {
      if (err) alert(err);
      else setLoggedIn(true);
    });
  }
  function signUp () {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }
  useEffect(() => {
    const getAlias = async () => {
      const alias = await user.get('alias').then();
      if (alias) setLoggedIn(true);
    };
    getAlias();

  },[]);
  function onUpdateUsername (e) {
    e.preventDefault();
    setUsername(e.target.value);
  }
  function onUpdatePasword (e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  return (
    <div>
      {loggedIn
        ? (
          <Redirect to="/app" />
        )
        : (
          <div className="LoginPage">
            <h1>Register or Login</h1>
            <div>
              <label htmlFor="uname">Username</label>
              <input className="loginInput" type="text" placeholder="Enter Username" name="uname" value={username} onChange={onUpdateUsername} required/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input className="loginInput" type="password" placeholder="Enter Password" name="password" value={password} onChange={onUpdatePasword} required/>
            </div>
            <div>
              <button className="buttons" onClick={login}>Login</button>
              <button className="buttons" onClick={signUp}>Register</button>
            </div>
            
          </div>
        )}
    </div>
  );
};

export default withRouter(Login);
