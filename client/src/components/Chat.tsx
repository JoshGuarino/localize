import { useEffect, useState } from "react"
//import io from 'socket.io-client'

export interface Message {
  id: number
  name: string
  message: string
  createdAt: Date
}

const messagesArr: Message[] = [
  {
    id: 1,
    name: 'Josh',
    message: 'hello world',
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Nick',
    message: 'hello world',
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'Kristen',
    message: 'hello world',
    createdAt: new Date(),
  },
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessages(messagesArr)
    console.log(messagesArr)
  }, [messages]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //socket.emit('newMessage', { name, message });
    messagesArr.unshift({
      id: 22,
      name: name,
      message: message,
      createdAt: new Date(),
    })
    setMessage('')
    setName('')
  };

  return (
    <>
      <div>
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
              rows={4}
              cols={40}
              className="border border-gray-300 p-2 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>

      <div className="h-full w-full p-2 overflow-auto border flex flex-col space-y-2">
        <ul role="list" className="divide-y">
          {messages.map((message) => (
            <li key={message.id} className="flex justify-between py-2 px-4 hover:shadow-md transition duration-200">
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
