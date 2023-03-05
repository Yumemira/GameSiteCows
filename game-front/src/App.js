import './App.css'
import {SocketContext, socket} from './views/components/socket'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Town from './views/Town.js'
import React from 'react'
import ArenaHouse from './views/townLocatons/Arena'
import ChurchHouse from './views/townLocatons/Church'
import ConquerorCenter from './views/townLocatons/ConquerorCenter'
import CustleHouse from './views/townLocatons/Custle'
import SmithHouse from './views/townLocatons/Smith'
import TavernHouse from './views/townLocatons/Tavern'
import Surroundings from './views/Surroundings'
import StoreHouse from './views/townLocatons/Store'
import NotificationTable from './views/components/notificationContainer'
import Loginpage from './views/components/loginpage'
import axios from 'axios'

function prooflogin(){
  if(localStorage.getItem('id')===null&&window.location.href !=='http://25.73.147.11:45932/login')
  {
    window.location = "/login"
  }
  else
  {
    axios.post('http://25.73.147.11:57159/prooflogin',{id:JSON.parse(localStorage.getItem('id')), loginkey:JSON.parse(localStorage.getItem('login-key'))})
    .then(res => {
      if(res.data.message!=="success") window.location = "/login"
    })
  }
}

function App() {
  prooflogin()
  
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path='login' element={<Loginpage />} />

            <Route path='town' element={<Town socket={socket} />} />
            <Route path='surroundings' element={<Surroundings socket={socket} />} />
            <Route path='town/arena-house' element={<ArenaHouse />} />
            <Route path='town/church-house' element={<ChurchHouse />} />
            <Route path='town/conqueror-house' element={<ConquerorCenter />} />
            <Route path='town/smith-house' element={<SmithHouse />} />
            <Route path='town/tavern-house' element={<TavernHouse />} />
            <Route path='town/store-house' element={<StoreHouse />} />
            <Route path='town/custle-house' element={<CustleHouse />} />
          </Routes>
        </div>
    </Router>
  </SocketContext.Provider>
  )
}

export default App