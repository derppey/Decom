import './Messages.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
import { addMessage, clearMessages, setServer, addServer } from '../../redux/actions';
import moment from 'moment';
import { db } from '../../services/userService';



const MessageContainer = ({ server,addMessage, clearMessages, messages}) => {
  const Server = db.get(`servers/${server}`);
  useEffect(() => {
    const getMessages = async () => {
      clearMessages();
      await Server.get('messages').map().once(async (data) => {
        if (data.createdAt >= new Date(+new Date() - 1 * 1000 * 60 * 60 * 3)) {
          addMessage({ data, server });
          const div = document.getElementById('Messages');
          div.scrollTop = div.scrollHeight;
        }
      });
    };
    getMessages();
  }, [server]);
  return (
    <div className="MessageDiv">
      {
        server === '' ? (<div id='Messages'></div>) : (
          <div id='Messages'>
            {
              messages.map((message) => (
                <div className="Message" key={message.id}>
                  <img className="profileImage" src={`https://avatars.dicebear.com/api/initials/${message.name}.svg`} />
                  <div className="Content">
                    <p>{message.name} <span>{moment(message.createdAt).fromNow()}</span></p>
                    <h5>{message.message}</h5>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server,
    messages: state.messages,

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
