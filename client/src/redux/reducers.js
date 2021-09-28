import { combineReducers } from 'redux';
let keys = [];
const messages = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    if (!(keys.includes(action.payload.message.id))) {
      keys.push(action.payload.message.id);
      const newState = {...state};
      const channel = action.payload.channel;
      if (newState[channel]) {
        newState[channel] = [...newState[channel], action.payload.message].sort((a,b) =>  a.createdAt - b.createdAt);
      } else {
        newState[channel] = [action.payload.message];
      }
      return newState;
    }
    return state;
  case 'CLEAR_MESSAGE':
    keys = [];
    return {};
  default:
    return state;
  }
};
const server = (state = '', action) => {
  switch (action.type) {
  case 'SET_SERVER':
    return action.payload?.server;
  default:
    return state;
  }
};
const serverList = (state = [], action) => {
  switch (action.type) {
  case 'ADD_SERVER':
    return action.payload?.server;
  default:
    return state;
  }
};

const alias = (state = '', action) => {
  switch (action.type) {
  case 'SET_ALIAS':
    return action.payload?.alias;
  default:
    return state;
  }
  
};

const channel = (state = 'general', action) => {
  switch (action.type) {
  case 'SET_CHANNEL':
    return action.payload?.channel;
  default:
    return state;
  }
};

const dm = (state = true, action) => {
  switch (action.type) {
  case 'SET_DM':
    return action.payload?.dm;
  default:
    return state;
  }
};
const reducers = combineReducers({
  messages,
  server,
  serverList,
  alias,
  channel,
  dm
});

export default reducers;
