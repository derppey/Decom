import React, { useEffect, useState } from 'react';
//import gunService from '../../services/gunService';
import { connect } from 'react-redux';
import { addServer, setServer } from '../../redux/actions';
import './ServerList.css';
import { useHistory } from 'react-router-dom';
import { db } from '../../services/userService';

const ServerList = ({ setServer,alias}) => {
  const history = useHistory();
  const [serverList, addServer] = useState([]);
  const servers = db.get(alias).get('serverList');
 

  useEffect(() => {
    const getAllServers = async () => {
      console.log(alias);
      let output = [];
      let keys = [];
      await servers.map().once((data) => {
        if (!(keys.includes(data.uuid))) {
          const array = [...output, data];
          output = array;
          console.log(data);
          keys.push(data.uuid);
          addServer(output);
        }
      });
      
    };

    getAllServers();
  }, []);
  async function createServer () {
    // const res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    // const data = await res.json();
    // gunService.createServer(data[0]);
    // console.log(serverList);

    history.push('/createServer');
  }
  async function updateDaServer (e) {
    const server = e.target.attributes.getNamedItem('alt').nodeValue;
    setServer(server);
  }

  return (
    <div className="ServerPanel">
      {
        serverList.map((server) => (
          <div className="ServerContainer" key={server.uuid}>
            <img className="Server" onClick={updateDaServer} src={server.icon} alt={server.uuid}/>
            <p className="Highlight">➤</p>
          </div>
        ))
      }
      <div>
        <button onClick={createServer} id="addServer"></button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server,
    alias: state.alias,

  };
};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerList);
