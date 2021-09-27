
import { v4 as uuidv4 } from 'uuid';
import { db } from './userService';


const serverNameArray = ['Test Server 3'];
const gunService = {
  getMessages: async (server) => {
    const Server = db.get(`servers/${server}`);
    const output = [];
    await Server.get('/messages').map().once((data, key) => {
      const splitted = key.split('/');
      data.id = splitted[splitted.length - 1];
      console.log(data);
      output.push(data);
      return output;
    });
  },
  saveNewMessage: async (message, server) => {
    const Server = db.get(`servers/${server}`);
    const newMessage = Server.get(`/messages/${message.id}`);
    newMessage.put(message);
    Server.get('/messages').set(newMessage);
    console.log('Hi i made it');
  },
  createServer: async (name) => {
    const servers = db.get('servers');
    if (!(serverNameArray.includes(name))) {
      const server = {
        name,
        uuid: uuidv4(),
      };
      servers.set(server);
      servers.get(`${server.id}`).put(server);

      

      console.log('🎉 Created server named: ', name);
    } else {
      console.log('Name already exits');
    }
  }
};

export default gunService;
