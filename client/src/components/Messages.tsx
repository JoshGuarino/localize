import { Message } from "./Chat";

export function Messages({ messages }: { messages: Message[] }) {
  const formatCreatedAt = (date: Date): string => {
    return new Date(date).toLocaleString()
  }

  return (
    <div className="h-full w-full p-2 overflow-auto border flex flex-col space-y-2">
      <ul role="list" className="divide-y">
        {messages.map((message, index) => (
          <li key={index} className="flex justify-between py-4 px-4 hover:shadow-md transition duration-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{message.name}:</span>
              <span className="text-gray-500 text-sm">{message.message}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">{formatCreatedAt(message.createdAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
} 
