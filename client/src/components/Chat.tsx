import { useState } from "react"

export interface Message {
  id: number
  name: string
  message: string
  createdAt: Date
}

const messages: Message[] = [
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
    id: 1,
    name: 'Kristen',
    message: 'hello world',
    createdAt: new Date(),
  },
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])



  return (
    <>

      <ul role="list" className="divide-y">
        {messages.map((message) => (
          <li key={"test"} className="flex justify-between gap-x-6 py-5">
            <div>
              {message.message}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
