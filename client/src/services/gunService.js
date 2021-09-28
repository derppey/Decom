
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
  saveNewMessage: async (message, server, channel) => {
    console.log(channel);
    const Server = db.get(`servers/${server}`);
    const newMessage = Server.get(`messages/${channel}/${message.id}`);
    newMessage.put(message);
    Server.get(channel).get('messages').set(newMessage);
  },
  createServer: async (alias, name, image) => {
    const servers = db.get('servers');
    if (!(serverNameArray.includes(name))) {
      const alias = await user.get('alias');
      const server = {
        name,
        uuid: uuidv4(),
        icon: image,
        owner: alias,
      };
      servers.set(server);
      db.get(alias).get('serverList').set(server);
      console.log(alias);
      servers.get(`${server.uuid}`).put(server);
      servers.get(`${server.uuid}`).get('members').set(user);
      const Server = db.get(`${server.uuid}`);
      Server.get('channels').set('general');
      console.log('🎉 Created server named: ', name);
      console.log(server);
    } else {
      console.log('Name already exits');
    }
  },
  getServer: async (uuid) => {
    const servers = db.get('servers');
    return servers.get(`${uuid}`).then();
  },
  createChannel: async (uuid, name) => {
    const Server = db.get(`servers/${uuid}`);
    Server.get('channels').set(name);
  },

};

export default gunService;
