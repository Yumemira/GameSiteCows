import React from "react"
import './Guildstyle.css'

export default class GuildHouse extends React.Component
{
    render()
    {
        return (<main className="main--container">
            <p>Это гильдия</p>
            <a href="/town" className="main--button">Вернуться</a>
            </main>)
    }
}