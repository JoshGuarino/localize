import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import Message from './models/message'
import router from './routes/routes';

const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.use('/', router)

io.on('connection', (socket) => {
  console.log('Socket connected');
  socket.on('chat message', async (msg) => {
    const newMessage = new Message(msg);
    await newMessage.save();
    io.emit('chat message', newMessage);
  })
})

const port = process.env.PORT || 3000
const startServer = async () => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
}
startServer()
