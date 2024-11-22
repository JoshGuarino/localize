//import { useState } from 'react'
import './App.css'
import { Chat } from './components/chat'
import { Header } from './components/Header'

function App() {
  return (
    <div className="w-full h-full border-2 rounded-lg">
      <Header></Header>
      <div className="h-full w-full p-2 overflow-auto">
        <Chat></Chat>
      </div>
    </div>
  )
}

export default App  
