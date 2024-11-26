import { useEffect, useState } from "react"
import io from 'socket.io-client'
import { Messages } from "./Messages"
import { Form } from "./Form"

export interface Message {
  name: string
  message: string
  createdAt: Date
}

const socket = io(`${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`)

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    socket.on('new message', (message: Message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const handleNewMessage = (message: Message): void => {
    socket.emit('new message', message)
  }

  return (
    <div className="w-full h-full border-2 rounded-lg">
      <Form onNewMessage={handleNewMessage}></Form>
      <Messages messages={messages}></Messages>
    </div>
  )
}
