import React from "react"
import Playerboard from "./components/playerboard"
import './Townstyle.css'

export default class Town extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            uid:JSON.parse(localStorage.getItem('id'))
        }
    }
    render()
    {
        return (<main id="town--container">
                <Playerboard pid={this.state.uid} />
                
                <a href="/town/church-house" id='town--church'className="main--button">Церковь</a>
                <a href="/town/tavern-house" id='town--tavern' className="main--button">Таверна</a>
                <a href="/town/smith-house" id='town--smith' className="main--button">Кузница</a>
                <a href="/town/conqueror-house" id='town--center' className="main--button">Центр сопротивления</a>
                <a href="/town/arena-house" id='town--arena' className="main--button">Арена</a>
                <a href="/town/store-house" id='town--store' className="main--button">Магазин</a>
                <a href="/town/custle-house" id='town--custle' className="main--button">Ратуша</a>  
                <a href="/surroundings" id="town--leave" className="main--button">Покинуть город</a>
        </main>)
    }
}