import React, {  useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import gunService from '../../services/gunService';
import { db, user } from '../../services/userService';
import './JoinServer.css';
const JoinServer = () => {
  const { uuid }= useParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverDetails, setServer] = useState({});
  const [localAlias, setAlias] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);

  function login () {
    return user.auth(username, password, ({ err }) => {
      if (err) alert(err);
      else setLoggedIn(true);
    });
  }

  function onUpdateUsername (e) {
    e.preventDefault();
    setUsername(e.target.value);
  }
  function onUpdatePasword (e) {
    e.preventDefault();
    setPassword(e.target.value);
  }


  useEffect(() => {
    const getAlias = async () => {
      const alias = await user.get('alias').then();
      if (alias) setLoggedIn(true);
    };
    getAlias();
    const getAndSet = async () => {
      const servers = db.get('servers');
      const alias = await user.get('alias');
      setAlias(alias);
      const server = await gunService.getServer(uuid);
      setServer(server);

      db.get(alias).get('serverList').set(server);
      servers.get(`${uuid}`).get('members').set(user);
    };
    getAndSet();
  }, [loggedIn]);

  return (
    <div>
      {localAlias !== '' ? (
        <div className="joinServer">
          <img src={serverDetails.icon}/>
          <div>
            <p className="joinMessage">Wow! {localAlias}, Joined {serverDetails.name}!</p>
            <p className="joinMessage">Click <Link to="/app">here</Link> to go back to the chat!</p>
          </div>
        </div>
      ): (
        <div>
          {
            loggedIn ? (
              <div className="joinServer">
                <p className="joinMessage">Wow! {localAlias}, Joined {serverDetails.name}!</p>
                <p className="joinMessage">Click <Link to="/app">here</Link> to go back to the chat!</p>
              </div>
            ): (
              <div className="LoginPage">
                <h1>Please join before you join!</h1>
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
                </div>
            
              </div>
            )
          }
        </div>
      )

      }
      
    </div>
  );
};

export default JoinServer;
