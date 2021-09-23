import './Messages.css';
import React, { useEffect, useState, useReducer } from 'react';

import Gun from 'gun'

const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})

const TestServer3 = gun.get('servers/Test Server 3')
const MessageContainer = () => {
  const [currentMessages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      let output = []
      await TestServer3.get('/messages').map().once((data,key) => {
        const array = [...output,data]
        output = array;
        setMessages(output);
      })
      
    }
    getMessages();
  }, [])

  return (
    <div className='Messages'>
      <ul>
        {
          currentMessages.map((message) => (
            <p key={message.message}>{message.message}</p>
          ))
        }
      </ul>
      
    </div>
  )
}

export default MessageContainer
