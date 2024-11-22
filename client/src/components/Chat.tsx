export interface Message {
  id: number
  name: string
  message: string
}

const messages: Message[] = [
  {
    id: 1,
    name: 'Josh',
    message: 'hello world'
  },
  {
    id: 2,
    name: 'Nick',
    message: 'hello world'
  },
  {
    id: 1,
    name: 'Kristen',
    message: 'hello world'
  },
]

export function Chat() {
  return (
    <ul role="list" className="divide-y">
      {messages.map((message) => (
        <li key={"test"} className="flex justify-between gap-x-6 py-5">
          <div>
            {message.message}
          </div>
        </li>
      ))}
    </ul>
  )
}
