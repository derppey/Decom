import React from 'react';
import Messages from '../Messages/Messages';

import MemberList from '../MemberList/MemberList';
import './MessageContainer.css';
import Config from '../Config/Config.js';
import { connect } from 'react-redux';


const MessageContainer = ({server}) => {
  return (
    <div className='MessageContainer'>
      {
        server === '' ? (<div className="placeHolder"></div>):
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

  };
};

const mapDispatchToProps = (dispatch) => ({
  setServer: (payload) => dispatch(setServer(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
