import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import Message from './models/message'
import router from './routes/routes'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors:
  {
    origin: 'http://localhost:5000'
  }
})
app.use('/', router)
app.use(cors())
dotenv.config()

io.on('connection', (socket) => {
  console.log('Socket connected')
  socket.on('new message', async (msg) => {
    const newMessage = new Message(msg)
    //await newMessage.save();
    io.emit('new message', newMessage)
  })
})

const port = process.env.SERVER_PORT
const startServer = async () => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
startServer()
