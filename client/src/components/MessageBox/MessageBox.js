import React, { useState } from 'react';
import gunService from '../../services/gunService';
import { v4 as uuidv4 } from 'uuid';
import './MessageBox.css';
import { addMessage } from '../../redux/actions';
import { connect } from 'react-redux';

const MessageBox = ({ channel,server, addMessage, alias }) => {
  const [formState, setForm] = useState({ message: '' });

  function onChange (e) {
    setForm({ ...formState, [e.target.name]: e.target.value });
  }
  function handleKeyDown (e) {
    if (e.key === 'Enter') {
      saveMessage();
    }
  }
  async function saveMessage () {
    const message = {
      name: alias,
      message: formState.message,
      id: uuidv4(),
      createdAt: Date.now()
    };
    
    addMessage({ data: message, server, channel});
    gunService.saveNewMessage(message, server, channel);
    setForm({ message: '' });

  }
  return (
    <div className="MessageBox">
      {server === '' ? (<b></b>):
        (<input
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="Type message"
          className="MessageInput"
          type='text'
          name="message"
          value={formState.message}
        />)
      }
      

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server,
    messages: state.messages,
    alias: state.alias,
    channel: state.channel

  };
};

const mapDispatchToProps = (dispatch) => ({
  addMessage: (payload) => dispatch(addMessage(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
