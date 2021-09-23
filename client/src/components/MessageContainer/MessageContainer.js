import React from 'react'
import Messages from '../Messages/Messages';
import MessageBox from '../MessageBox/MessageBox';
const MessageContainer = () => {
  return (
    <div className='MessageContainer'>
      <Messages />
      <MessageBox />
    </div>
  )
}

export default MessageContainer
