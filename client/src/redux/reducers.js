import { combineReducers } from 'redux';

const messages = ( state = {}, action) => {
  switch (action.type){
    case 'ADD_MESSAGE':
      var newState = {...state};
      newState[action.server].messages.push(action.message);
      return newState;
    default:
      return state; 
  }

};

const reducers = combineReducers({
  messages,
});

export default reducers;