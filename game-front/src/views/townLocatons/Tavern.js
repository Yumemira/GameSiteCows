import React from "react"
import './Tavernstyle.css'
import Playerboard from "../components/playerboard"

export default class TavernHouse extends React.Component
{
    render()
    {
        return (<main id="tavern--container">
            <Playerboard />
            <button id="tavern--forum" className="main--button-interactive">Форум</button>
            <button id="tavern--food" className="main--button-interactive">Еда</button>
            <button id="tavern--quest" className="main--button-interactive">Задания</button>
            <a href="/town"  className="main--return">Вернуться</a>
            </main>)
    }
}