import React from "react"
import './Churchstyle.css'

export default class ChurchHouse extends React.Component
{
    render()
    {
        return (<main className="main--container">
            <p>Это церковь</p>
            <a href="/town" className="main--button">Вернуться</a>
            </main>)
    }
}