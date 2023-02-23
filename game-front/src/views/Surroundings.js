import React from "react"
import './Surroundingsstyle.css'

export default class Surroundings extends React.Component
{
    render()
    {
        return (<main id="main--container">
            <p>Вы покинули город</p>
            <a href="/town" className="main--button" >вернуться</a>
        </main>)
    }
}