import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setChannel } from '../../redux/actions';
import gunService from '../../services/gunService';
import { db, user } from '../../services/userService';


import './Config.css';
const Config = ({server, setChannel}) => {

  const [channelName, setChannelName] = useState('');
  const [channelList, setChannelList] = useState(['general']);
  const [serverName, setServerName] = useState('');
  const [serverOwner, setServerOwner] = useState(false);
  useEffect(() => {
    const getChannels = async () => {
      const Server = db.get(`servers/${server}`);
      let output = ['general'];
      setChannelList(['general']);
      Server.get('channels').map().once((data) => {
        if (!data || output.includes(data)) {
          return;
        }
        output = [...output, data];
        setChannelList(output);
      });
      const userAlias = await user.get('alias');
      const details = await gunService.getServer(server);
      setServerOwner(details.owner === userAlias);
      console.log(details, userAlias);
      setServerName('[ ' + details.name + ' ]');
      

      
    };
    getChannels();
    

  },[server]);
  function sendInvite () {
    navigator.clipboard.writeText(`https://192.168.1.70:3000/join/${server}`);
    alert('Copied to clipboard!');
  }

  function updateChannel (e) {
    const res = e.target.innerHTML.match(/\w/gm).join('');
    setChannel(res);
  }
  
  function onChange (e) {
    setChannelName(e.target.value);
  }
  function handleKeyDown (e) {
    if (e.key === 'Enter') {
      //Create New server
      gunService.createChannel(server, channelName);
      setChannelName('');
    }
  }
  
  
  return (
    <div className="Config">
      <div>
        <h1>{serverName}</h1>
         
      </div>
      {
        channelList.map((channel) => (
          <div className="flexItem" key={channel}><p onClick={updateChannel}>[ {channel} ]</p></div>
        ))
      }
      
      {serverOwner ? (
        <div className="flexItem">
          <p className="createNewServer">[ <input type='text' value={channelName} onChange={onChange} onKeyDown={handleKeyDown} /> ]</p>
        </div>
      ) : (<b></b>)}
      <div className="flexItem"><button onClick={sendInvite}className="inviteButton">Invite</button></div>
      
      
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    server: state.server,
    channel: state.channel,

  };
};

const mapDispatchToProps = (dispatch) => ({
  setChannel: (payload) => dispatch(setChannel(payload)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);

