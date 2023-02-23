import './App.css'
import {SocketContext, socket} from './views/components/socket'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Town from './views/Town.js'
import React from 'react'
import ArenaHouse from './views/townLocatons/Arena'
import ChurchHouse from './views/townLocatons/Church'
import ConquerorCenter from './views/townLocatons/ConquerorCenter'
import GuildHouse from './views/townLocatons/Guild'
import SmithHouse from './views/townLocatons/Smith'
import TavernHouse from './views/townLocatons/Tavern'
import Surroundings from './views/Surroundings'

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path='town' key="b" element={<Town socket={socket} />} />
            <Route path='surroundings' element={<Surroundings socket={socket} />} />

            <Route path='town/arena-house' element={<ArenaHouse />} />
            <Route path='town/church-house' element={<ChurchHouse />} />
            <Route path='town/conqueror-house' element={<ConquerorCenter />} />
            <Route path='town/guild-house' element={<GuildHouse />} />
            <Route path='town/smith-house' element={<SmithHouse />} />
            <Route path='town/tavern-house' element={<TavernHouse />} />
          </Routes>
        </div>
    </Router>
  </SocketContext.Provider>
  )
}

export default App