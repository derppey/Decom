import { combineReducers } from 'redux';
let keys = [];
const messages = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    if (!(keys.includes(action.payload.message.id))) {
      keys.push(action.payload.message.id);
      return [...state, action.payload.message].sort((a, b) => a.createdAt - b.createdAt);
    }
    return state;
  case 'CLEAR_MESSAGE':
    keys = [];
    return [];
  default:
    return state;
  }
};
const server = (state = 'Test Server 3', action) => {
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

const reducers = combineReducers({
  messages,
  server,
  serverList
});

export default reducers;
