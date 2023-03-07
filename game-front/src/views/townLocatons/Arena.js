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
    }

    startNoviceFight = () => {
        window.location = 'http://25.73.147.11:45932/fight-scarecrow'
    }

    render(){
        return (<main id="arena--container">
            <Playerboard />
            <button href="/town/arena" id="arena--random" className="main--button-interactive">Случайные соперники</button>
            <button href="/town/arena" id="arena--bet" className="main--button-interactive" onClick={this.startNoviceFight}>Тренировка</button>
            <a href="/town" className="main--return">Вернуться</a>
        </main>)
    }
}