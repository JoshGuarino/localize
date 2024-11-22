//import { useState } from 'react'
import { Chat } from './components/Chat'
import { Header } from './components/Header'

function App() {
  return (
    <>
      <Header></Header>
      <div className="w-full h-full border-2 rounded-lg">
        <Chat></Chat>
      </div>
    </>
  )
}

export default App  
