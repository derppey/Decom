import React, {useState} from 'react'
import gunService from '../../services/gunService';
import './MessageBox.css';
const MessageBox = () => {
  const [formState, setForm] = useState({message: ''});

  function onChange(e) {
    setForm({ ...formState, [e.target.name]: e.target.value  })
  }
  function saveMessage() {
    gunService.saveNewMessage('Sample User', formState.message);
  }
  return (
    <div className="MessageBox">
      <input
        onChange={onChange}
        placeholder="Type message"
        type='text'
        name="message"
        value={formState.message}
      />
      <button onClick={saveMessage}>Send Message</button>
    </div>
  )
}

export default MessageBox
