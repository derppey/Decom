
import { v4 as uuidv4 } from 'uuid';
import { db, user} from './userService';


const serverNameArray = ['Test Server 3'];
const gunService = {
  getMessages: async (server) => {
    const Server = db.get(`servers/${server}`);
    const output = [];
    await Server.get('messages').map().once((data, key) => {
      const splitted = key.split('/');
      data.id = splitted[splitted.length - 1];
      console.log(data);
      output.push(data);
      return output;
    });
  },
  saveNewMessage: async (message, server) => {
    const Server = db.get(`servers/${server}`);
    const newMessage = Server.get(`messages/${message.id}`);
    newMessage.put(message);
    Server.get('messages').set(newMessage);
    console.log('Hi i made it');
  },
  createServer: async (alias, name, image) => {
    const servers = db.get('servers');
    if (!(serverNameArray.includes(name))) {
      const server = {
        name,
        uuid: uuidv4(),
        icon: image,
      };
      servers.set(server);
      db.get(alias).get('serverList').set(server);
      servers.get(`${server.uuid}`).put(server);
      servers.get(`${server.uuid}`).get('members').set(user);
      console.log('🎉 Created server named: ', name);
      console.log(server);
    } else {
      console.log('Name already exits');
    }
  },
  getServer: async (uuid) => {
    const Server = await db.get(`servers/${uuid}`);
    return Server;
    
  }

};

export default gunService;
