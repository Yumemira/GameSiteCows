import React from "react"
import './Tavernstyle.css'

export default class TavernHouse extends React.Component
{
    render()
    {
        return (<main className="main--container">
            <p>Это таверна</p>
            <a href="/town" className="main--button">Вернуться</a>
            </main>)
    }
}