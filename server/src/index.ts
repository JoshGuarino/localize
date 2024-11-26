import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import Message from './models/message'
import router from './routes/routes'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './util/db'

// load env vars and configure express
dotenv.config()
const app = express()
app.use('/', router)
app.use(cors())

// configure socket.io server
const server = http.createServer(app)
const client = process.env.CLIENT_URL
const io = new Server(
  server,
  {
    cors: { origin: client },
  },
)

// connet to mongodb instance
connectDB()

// listen for on 'new message' event and save to db
io.on('connection', (socket) => {
  console.log('Socket connected')
  socket.on('new message', async (msg) => {
    const newMessage = new Message(msg)
    await newMessage.save()
    io.emit('new message', newMessage)
  })
})

// set port and start server
const port = process.env.SERVER_PORT
const startServer = async () => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
startServer()
