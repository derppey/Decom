import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setChannel } from '../../redux/actions';
import gunService from '../../services/gunService';
import { db } from '../../services/userService';


import './Config.css';
const Config = ({server, setChannel}) => {

  const [channelName, setChannelName] = useState('');
  const [channelList, setChannelList] = useState(['general']);

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
        
      <div className="flexItem"><h3 id="title">Text Channels</h3></div>
      {
        channelList.map((channel) => (
          <div className="flexItem" key={channel}><p onClick={updateChannel}>[ {channel} ]</p></div>
        ))
      }
      <div className="flexItem"><p>[ <input type='text' value={channelName} onChange={onChange} onKeyDown={handleKeyDown} /> ]</p></div>
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

