import React from "react"
import './ConquerorCenterstyle.css'

export default class ConquerorCenter extends React.Component
{
    render()
    {
        return (<main className="main--container">
            <p>Это центр сопротиления</p>
            <a href="/town" className="main--button">Вернуться</a>
            </main>)
    }
}