import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import GunService from './services/gunService';
import { connect } from 'react-redux';
import { addServer , setServer} from './redux/actions';

import Dashboard from './components/Dashboard/Dashboard';
// initialize gun locally
const gun = Gun({
  peers: [
    'http://192.168.1.70:3030/gun',
  ]
})
function App({addServer}) {
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
          addServer(output);
        };
      })
    }

    getAllServers();
    
  }, [])


  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server

  };

};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
