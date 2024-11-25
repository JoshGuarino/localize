import { FormEvent, useState } from "react"
import { Message } from "./Chat";

interface FormProps {
  onNewMessage: (message: Message) => void;
}

export function Form({ onNewMessage }: FormProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    onNewMessage({
      name, message, createdAt: new Date()
    })
    setName('')
    setMessage('')
  }

  return (
    <div className="py-4 px-4">
      <form
        className="flex flex-col md:flex-row md:items-center md:justify-evenly md:gap-8 h-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 my-4">
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
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 my-4">
          <label htmlFor="message" className="font-bold mr-2">Message:</label>
          <textarea
            id="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            cols={30}
            className="border border-gray-300 p-2 rounded resize-none"
            maxLength={240}
          ></textarea>
        </div>
        <div className="my-4">
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
