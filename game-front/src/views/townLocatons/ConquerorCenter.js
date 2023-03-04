import React from "react"
import './ConquerorCenterstyle.css'
import Playerboard from "../components/playerboard"

export default class ConquerorCenter extends React.Component
{
    render()
    {
        return (<main id="conqueror--container">
            <Playerboard />
            <p>Это центр сопротиления</p>
            <a href="/town" className="main--return">Вернуться</a>
            </main>)
    }
}