import { useEffect, useState } from "react"
import io from 'socket.io-client'

export interface Message {
  name: string
  message: string
  createdAt: Date
}

const socket = io('http://localhost:3000')

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.on('new message', (message: any) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    socket.emit('new message', {
      name,
      message,
      createdAt: new Date()
    })
    setMessage('')
    setName('')
  };

  return (
    <>
      <div className="py-4 px-4">
        <form
          className="flex flex-col md:flex-row md:items-center md:justify-evenly md:gap-8 h-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <label htmlFor="name" className="font-bold mr-2">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded"
              maxLength={24}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <label htmlFor="message" className="font-bold mr-2">Message:</label>
            <textarea
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              cols={48}
              className="border border-gray-300 p-2 rounded resize-none"
              maxLength={240}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>

      <div className="h-full w-full p-2 overflow-auto border flex flex-col space-y-2">
        <ul role="list" className="divide-y">
          {messages.map((message, index) => (
            <li key={index} className="flex justify-between py-4 px-4 hover:shadow-md transition duration-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{message.name}:</span>
                <span className="text-gray-500 text-sm">{message.message}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">{message.createdAt.toString()}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
