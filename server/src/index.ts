import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import Message from './models/message'
import router from './routes/routes'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors:
  {
    origin: 'http://localhost:5173',
  }
})
app.use('/', router)
app.use(cors())

io.on('connection', (socket) => {
  console.log('Socket connected')
  socket.on('new message', async (msg) => {
    const newMessage = new Message(msg)
    //await newMessage.save();
    io.emit('new message', newMessage)
  })
})

const port = process.env.PORT || 3000
const startServer = async () => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
startServer()
