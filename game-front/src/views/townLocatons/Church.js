import React from "react"
import './Churchstyle.css'
import Playerboard from "../components/playerboard"

export default class ChurchHouse extends React.Component
{
    render()
    {
        return (<main id="church--container">
                <Playerboard />
                <button href="/town/church-house" id="church--bless" className="main--button-interactive">Благословение</button>
                <button href="/town/church-house" id="church--quest" className="main--button-interactive">Задания</button>
                <a href="/town" className="main--return">Вернуться</a>
            </main>)
    }
}