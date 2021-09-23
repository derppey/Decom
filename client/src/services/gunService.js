import Gun from 'gun'
import { v4 as uuidv4 } from 'uuid';
const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})

const serverNameArray = ['Test Server 3']
const TestServer3 = gun.get('servers/Test Server 3')
const gunService = {
  getAllMessages: async () => {
    let output = []
    await TestServer3.get('/messages').map().once((data,key) => {
      output.push(data);
    })
    return output;
  },
  saveNewMessage: async (user, message) => {
    TestServer3.get('/messages').set({
      name: user,
      message: message,
      id: uuidv4(),
      createdAt: Date.now(),
    });
  },
  createServer: async(name) => {
    const servers = gun.get(`servers`);
    if(!(serverNameArray.includes(name))){
      servers.set({
        name,
        uuid: uuidv4(),
      })
      servers.get(`/${name}`).put({
        name,
        uuid: uuidv4(),
      })
      console.log('🎉 Created server named: ', name);
    }else{
      console.log('Name already exits')
    }
  }
}


export default gunService;
