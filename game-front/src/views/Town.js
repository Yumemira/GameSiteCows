import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Church from "./townLocatons/Church"
import './Townstyle.css'

export default class Town extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (<main id="main--container">
            <a href="/town/church-house" className="main--button">церковь</a>
            <a href="/town/guild-house" className="main--button">гильдия</a>
            <a href="/town/tavern-house" className="main--button">таверна</a>
            <a href="/town/smith-house" className="main--button">Кузница</a>
            <a href="/town/conqueror-house" className="main--button">Центр сопротиления</a>
            <a href="/town/arena-house" className="main--button">Арена</a>
            <a href="/surroundings" className="main--button">Покинуть город</a>
        </main>)
    }
}