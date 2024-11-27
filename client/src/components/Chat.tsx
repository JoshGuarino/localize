import { useEffect, useState } from "react"
import io from 'socket.io-client'
import { Messages } from "./Messages"
import { Form } from "./Form"

export interface Message {
  name: string
  message: string
  createdAt: Date
}

const server = import.meta.env.VITE_SERVER_URL
const socket = io(server)

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (messages.length === 0) {
      getMessages()
    }
    socket.on('new message', (message: Message) => {
      setMessages([message, ...messages])
    })
  }, [messages])

  const getMessages = async () => {
    try {
      const response = await fetch(server + '/messages');
      const result = await response.json()
      setMessages([...result.reverse()])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

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
