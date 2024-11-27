import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import router from './routes/routes'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './util/db'
import events from './socket/events'

// load env vars 
dotenv.config()

// configure express
const app = express()
app.use(cors())
app.use('/', router)

// connet to mongodb instance
connectDB()

// configure socket.io server
const server = http.createServer(app)
const client = process.env.CLIENT_URL
const io = new Server(server, {
  cors: {
    origin: client,
    methods: ["GET"],
  },
})

// handle on 'connection' socket server
io.on('connection', (socket) => {
  console.log('Socket connected')
  events(io, socket)
})

// run the server...
const startServer = async () => {
  const port = process.env.SERVER_PORT
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
startServer()
