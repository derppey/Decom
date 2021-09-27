import React from 'react';
import Messages from '../Messages/Messages';
import MessageBox from '../MessageBox/MessageBox';
const MessageContainer = ({alias}) => {
  return (
    <div className='MessageContainer'>
      <Messages />
      <MessageBox alias={alias}/>
    </div>
  );
};

export default MessageContainer;
