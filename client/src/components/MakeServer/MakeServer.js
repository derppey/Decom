import React from 'react';
import './MakeServer.css';

const MakeServer = () => {
  return (
    <div className="ServerCreation">
      <h1>Create your server!</h1>
      <div>
        <label htmlFor="uname">Server Name: </label>
        <input type="text" placeholder="Enter Username" name="uname" value={username} onChange={onUpdateUsername} required/>
      </div>
      <button onClick={login}>Create Server</button>
    </div>
  );
};

export default MakeServer;
