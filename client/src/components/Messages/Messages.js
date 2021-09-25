import './Messages.css';
import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import Gun from 'gun'
import gunService from '../../services/gunService';
import { addMessage, clearMessages, setServer, addServer} from '../../redux/actions';
import moment from 'moment';

const gun = Gun({
  peers: [
    'http://192.168.1.70:3030/gun',
  ]
})


const MessageContainer = ({server ,addMessage, clearMessages, messages}) => {
  const Server = gun.get(`servers/${server}`)
  useEffect(() => {
    const getMessages = async () => {
      clearMessages();
      var match = {
        // lexical queries are kind of like a limited RegEx or Glob.
        '.': {
          // property selector
          'createdAt': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3), // find any indexed property larger ~3 hours ago
        },
        '-': 1, // filter in reverse
      };
      await Server.get('/messages').map(message => message.createdAt >= new Date(+new Date() - 1 * 1000 * 60 * 60 * 3) ? message : undefined).once(async (data,key) => {
        addMessage({data, server});
        let div = document.getElementById('Messages');
        div.scrollTop = div.scrollHeight;
      })
      
    }
    getMessages();
  }, [server])
  return (
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
  clearMessages: () => dispatch(clearMessages()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);


