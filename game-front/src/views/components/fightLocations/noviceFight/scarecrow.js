import React from "react"
import InputElement from "../../easyelem"
import './scarecrowstyle.css'

export default class Scarecrow extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            log:[]
        }
    }

    render() {
        return (<main id="fight--main">
            <section id="fight--log">
            {this.state.log}
            </section>
            <InputElement mclass='input--label' iname='fight--suggestion' elclass='input--field' buttonName="Введите текущие приёмы" />
            <button id="fight--suggest" className="fight--button">{">>"}</button>
            <button id="fight--quit" className="fight--button">Сдаться</button>
            <button id="fight--items" className="fight--button">Предметы</button>
        </main>)
    }
}