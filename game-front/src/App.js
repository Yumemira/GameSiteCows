import './App.css'
import {SocketContext, socket} from './views/components/socket'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Town from './views/Town.js'
import React from 'react'

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path='' key="b" element={<Town socket={socket} />} />
          </Routes>
        </div>
    </Router>
  </SocketContext.Provider>
  )
}

export default App