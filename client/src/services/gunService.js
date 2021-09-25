import Gun from 'gun'
import { v4 as uuidv4 } from 'uuid'
const gun = Gun({
  peers: [
    'http://192.168.1.70:3030/gun'
  ]
})

const serverNameArray = ['Test Server 3']
const gunService = {
  getMessages: async (server) => {
    const Server = gun.get(`servers/${server}`)
    const output = []
    await Server.get('/messages').map().once((data, key) => {
      const splitted = key.split('/')
      data.id = splitted[splitted.length - 1]
      output.push(data)
      return output
    })
  },
  saveNewMessage: async (message, server) => {
    const Server = gun.get(`servers/${server}`)
    const newMessage = Server.get(`/messages/${message.id}`)
    newMessage.put(message)
    Server.get('/messages').set(newMessage)
  },
  createServer: async (name) => {
    const servers = gun.get('servers')
    if (!(serverNameArray.includes(name))) {
      servers.set({
        name,
        uuid: uuidv4()
      })
      servers.get(`/${name}`).put({
        name,
        uuid: uuidv4()
      })
      console.log('🎉 Created server named: ', name)
    } else {
      console.log('Name already exits')
    }
  }
}

export default gunService
