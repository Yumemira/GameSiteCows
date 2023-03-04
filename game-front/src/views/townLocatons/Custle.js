import React from "react"
import './Custlestyle.css'
import Playerboard from "../components/playerboard"

export default class CustleHouse extends React.Component
{
    render()
    {
        return (<main id="custle--container">
            <Playerboard />
            <button id="custle--donut" className="main--button-interactive">Пожертвования</button>
            <button id="custle--quest" className="main--button-interactive">Задания</button>
            <button id="custle--guild" className="main--button-interactive">Гильдия</button>
            <a href="/town" className="main--return">Вернуться</a>
            </main>)
    }
}