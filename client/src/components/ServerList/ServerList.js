import React, { useEffect, useState } from 'react';
//import gunService from '../../services/gunService';
import { connect } from 'react-redux';
import { addServer, setServer, setDm } from '../../redux/actions';
import './ServerList.css';
import { useHistory } from 'react-router-dom';
import { db } from '../../services/userService';

const ServerList = ({ setServer,alias, setDm}) => {
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
    setDm(false);
  }
  function dmTime () {
    setDm(true);
  }
  return (
    <div className="ServerPanel">
      <div className="ServerContainer">
        <img className="dmImg" onClick={dmTime} src={process.env.PUBLIC_URL + '/logo2.png'}/>
        <p className="Highlight">➤</p>
      </div>
      <hr className="solid" />
      {
        serverList.map((server) => (
          <div className="ServerContainer" key={server.uuid}>
            <img className="Server" onClick={updateDaServer} src={server.icon} alt={server.uuid}/>
            <p className="Highlight">➤</p>
          </div>
        ))
      }
      <div className="addButton">
        <button onClick={createServer} id="addServer">+</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server,
    alias: state.alias, 
    dm: state.dm,

  };
};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload)),
  setDm: (payload) => dispatch(setDm(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerList);
