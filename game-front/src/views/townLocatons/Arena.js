import React from "react"
import './Arenastyle.css'
import Playerboard from "../components/playerboard"

export default class ArenaHouse extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            uid:JSON.parse(localStorage.getItem('id'))
        }
        this.startNoviceFight = this.startNoviceFight.bind(this)
        this.startPvpFight = this.startPvpFight.bind(this)
    }

    startNoviceFight = () => {
        window.location = 'http://25.73.147.11:45932/fight-scarecrow'
    }

    startPvpFight = () => {
        window.location = 'http://25.73.147.11:45932/pvp-fight-arena'
    }

    render(){
        return (<main id="arena--container">
            <Playerboard />
            <button id="arena--random" className="main--button-interactive" onClick={this.startPvpFight} >Случайные соперники</button>
            <button id="arena--crowscare" className="main--button-interactive" onClick={this.startNoviceFight}>Тренировка</button>
            <a href="/town" className="main--return">Вернуться</a>
        </main>)
    }
}