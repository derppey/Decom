import React from 'react';
import { connect } from 'react-redux';

import './Config.css';
const Config = ({server}) => {
  function sendInvite () {
    navigator.clipboard.writeText(`https://192.168.1.70:3000/join/${server}`);
    alert('Copied to clipboard!');
  }
  return (
    <div className="Config">
        
      <div><h3>Text Channels</h3></div>
      <div><p>[ general ]</p></div>
      <div><p>[ other ]</p></div>
      <div><p>[ test ]</p></div>
      <div><button onClick={sendInvite}className="inviteButton">Invite</button></div>
      
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    server: state.server,

  };
};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);

