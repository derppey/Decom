import React from 'react';
import Messages from '../Messages/Messages';

import MemberList from '../MemberList/MemberList';
import './MessageContainer.css';
import Config from '../Config/Config.js';
import { connect } from 'react-redux';


const MessageContainer = ({dm}) => {
  return (
    <div className='MessageContainer'>
      {
        dm ? (
          <div className="placeHolder">
            <h1>Welcome to Decom!</h1>
            <h3>Click on the + button to create your own server.</h3>
            <br></br>
            <h3>Alternatively you can join a server by clicking on a join link.</h3>
            <h3>You could also directly message someone by clicking the
              <br />purple message bubble at the top</h3>
          </div>
        ):
          (<div className='MessageSubContainer'>
            <Config />
            <Messages />
            <MemberList />
          </div>
          )
      }
      
      
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    server: state.server,
    dm: state.dm,

  };
};

const mapDispatchToProps = (dispatch) => ({
  setServer: (payload) => dispatch(setServer(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
