import { Server, Socket } from 'socket.io'
import Message from '../models/message'

// listen for on 'new message' event, 
// save to db and send to all clients
export default (io: Server, socket: Socket) => {
  socket.on('new message', async (msg) => {
    const newMessage = new Message(msg)
    await newMessage.save()
    io.emit('new message', msg)
  })
}
