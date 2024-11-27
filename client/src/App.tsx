import io from 'socket.io-client'
import { Chat } from './components/Chat'
import { Header } from './components/Header'

function App() {
  const server = import.meta.env.VITE_SERVER_URL
  const socket = io(server)

  return (
    <>
      <Header></Header>
      <Chat server={server!} socket={socket!}></Chat>
    </>
  )
}

export default App  
