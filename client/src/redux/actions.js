export const addMessage = (messagePayload) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {
      message: messagePayload.data,
      server: messagePayload.currentServer,
      channel: messagePayload.channel,
    }
  };
};

export const clearMessages = () => {
  return {
    type: 'CLEAR_MESSAGE'
  };
};

export const addServer = (server) => {
  return {
    type: 'ADD_SERVER',
    payload: {
      server: server
    }
  };
};

export const setServer = (server) => {
  return {
    type: 'SET_SERVER',
    payload: {
      server: server
    }
  };
};

export const setAlias = (alias) => {
  return {
    type: 'SET_ALIAS',
    payload: {
      alias: alias
    }
  };
};

export const setChannel = (channel) => {
  return {
    type: 'SET_CHANNEL',
    payload: {
      channel: channel
    }
  };
};