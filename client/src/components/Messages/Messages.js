import './Messages.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
import { addMessage, clearMessages, setServer, addServer } from '../../redux/actions';
import moment from 'moment';
import { db } from '../../services/userService';
import MessageBox from '../MessageBox/MessageBox';
const MessageContainer = ({ channel, server,addMessage, clearMessages, messages}) => {
  const Server = db.get(`servers/${server}`);
  useEffect(() => {
    const getMessages = async () => {
      clearMessages();
      await Server.get(channel).get('messages').map().once(async (data) => {
        if (data.createdAt >= new Date(+new Date() - 1 * 1000 * 60 * 60 * 3)) {
          addMessage({ data, server, channel });
          const div = document.getElementById('Messages');
          div.scrollTop = div.scrollHeight;
        }
      });
    };
    getMessages();
  }, [server, channel]);
  return (
    <div className="MessageDiv">
      <h1 id="channelName">[ {channel} ]</h1>
      {
        
        (!messages[channel]) ? (<div id='Messages'></div>) : (
          <div id='Messages'>
            {
              messages[channel].map((message) => (
                <div className="Message" key={message.id}>
                  <img className="profileImage" src={`https://avatars.dicebear.com/api/initials/${message.name}.svg`} />
                  <div className="Content">
                    <p className="sender">{message.name} <span>{moment(message.createdAt).fromNow()}</span></p>
                    <h5>{message.message}</h5>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
      <MessageBox />
     
      
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server,
    messages: state.messages,
    channel: state.channel,

  };
};

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload)),
  addMessage: (payload) => dispatch(addMessage(payload)),
  clearMessages: () => dispatch(clearMessages())

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
