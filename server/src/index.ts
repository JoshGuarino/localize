import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import Message from './models/message'
import router from './routes/routes'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './util/db'

dotenv.config()
const app = express()
app.use('/', router)
app.use(cors())

const server = http.createServer(app)
const client = process.env.CLIENT_URL
const io = new Server(
  server,
  {
    cors: { origin: client },
  },
)
connectDB()

io.on('connection', (socket) => {
  console.log('Socket connected')
  socket.on('new message', async (msg) => {
    const newMessage = new Message(msg)
    await newMessage.save();
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
