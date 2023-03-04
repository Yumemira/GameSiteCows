import React from "react"
import './Storestyle.css'
import Playerboard from "../components/playerboard"

export default class StoreHouse extends React.Component
{
    render(){
        return (<main id="store--container">
            <Playerboard />
            <p>Это магазин</p>
            <a href="/town" className="main--return">Вернуться</a>
            </main>)
    }
}