import React, { useState } from 'react'
import gunService from '../../services/gunService'
import { v4 as uuidv4 } from 'uuid'
import './MessageBox.css'
import { addMessage, clearMessages, setServer, addServer } from '../../redux/actions'
import { connect } from 'react-redux'

const MessageBox = ({ server, messages, addMessage }) => {
  const [formState, setForm] = useState({ message: '' })

  function onChange (e) {
    setForm({ ...formState, [e.target.name]: e.target.value })
  }
  function handleKeyDown (e) {
    if (e.key === 'Enter') {
      saveMessage()
    }
  }
  function saveMessage () {
    const message = {
      name: 'Sample User',
      message: formState.message,
      id: uuidv4(),
      createdAt: Date.now()
    }
    addMessage({ data: message, server })
    gunService.saveNewMessage(message, server)
    setForm({ message: '' })
  }
  return (
    <div className="MessageBox">
      <input
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Type message"
        className="MessageInput"
        type='text'
        name="message"
        value={formState.message}
      />

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    serverList: state.serverList,
    server: state.server,
    messages: state.messages

  }
}

const mapDispatchToProps = (dispatch) => ({
  addServer: (payload) => dispatch(addServer(payload)),
  setServer: (payload) => dispatch(setServer(payload)),
  addMessage: (payload) => dispatch(addMessage(payload)),
  clearMessages: () => dispatch(clearMessages())

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox)
