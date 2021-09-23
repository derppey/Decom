import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import GunService from './services/gunService';
import { connect } from 'react-redux';
import { addMessage } from './redux/actions';

import Dashboard from './components/Dashboard/Dashboard';
import gunService from './services/gunService';

const serverContext = React.createContext(null);
// initialize gun locally
const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})
export default function App() {
  const [serverNameArray, setServers] = useState([])
  const [formState, setForm] = useState({
    name: '',
    message: ''
  });
  const servers = gun.get(`servers`);

  useEffect(() => {
    const getAllServers = async () => {
      let output = []
      await servers.map().once((data,key) => {
        if(!(output.includes(data.name))){
          const array = [...output,data.name]
          output = array;
          setServers(output);
        };
      })
    }

    getAllServers();
    
  }, [])

  // set a new message in gun, update the local state to reset the form field
  function saveMessage() {
    gunService.saveNewMessage(formState.name, formState.message);

    setForm({
      name: '', message: ''
    })
  }

  // update the form state as the user types
  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value  })
  }

  return (
    <div className="App">
      <serverContext.Provider value={serverNameArray}>
        <Dashboard/>
      </serverContext.Provider>
    </div>
  );
}




export {
  serverContext
}
