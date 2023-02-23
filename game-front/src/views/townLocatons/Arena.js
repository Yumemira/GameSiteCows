import React from "react"
import './Arenastyle.css'

export default class ArenaHouse extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render(){
        return (<main id="main--container">
            <p>Это арена</p>
            <a href="/town" className="main--button">Вернуться</a>
        </main>)
    }
}