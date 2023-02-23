import React from "react"
import './Smithstyle.css'

export default class SmithHouse extends React.Component
{
    render()
    {
        return (<main className="main--container">
            <p>Это Кузница</p>
            <a href="/town" className="main--button">Вернуться</a>
            </main>)
    }
}