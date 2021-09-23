import { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import GunService from './services/gunService';
import { connect } from 'react-redux';
import { addMessage } from './redux/actions';

import Dashboard from './components/Dashboard/dashboard';
import gunService from './services/gunService';
// initialize gun locally
const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})
const serverNameArray = [];
export default function App() {
  const [formState, setForm] = useState({
    name: '',
    message: ''
  });
  const servers = gun.get(`servers`);

  useEffect(() => {
    const getAllServers = async () => {
      await servers.map().once((data,key) => {
        if(!(serverNameArray.includes(data.name))){ serverNameArray.push(data.name) };
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
    <div>
      <Dashboard />
    </div>
  );
}



export {
  serverNameArray
}
