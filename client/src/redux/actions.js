export const addMessage = (messagePayload) => {
  console.log(messagePayload);
  return {
    type: 'ADD_MESSAGE',
    payload: {
      message: messagePayload.data,
      server: messagePayload.currentServer
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

