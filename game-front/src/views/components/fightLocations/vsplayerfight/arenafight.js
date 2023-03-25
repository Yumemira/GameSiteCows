import React from 'react'
import './arenafightstyle.css'
import InputElement from '../../easyelem'
import NotificationTable from '../../notificationContainer'

export default class Arenafight extends React.Component
{   

    constructor(props)
    {
        super(props)
        this.state = {
            log:[],
            state:'prepare',
            notif:<></>
        }
        this.doSuggestion = this.doSuggestion.bind(this)
        this.endgameb = this.endgameb.bind(this)
        this.closeNotif = this.closeNotif.bind(this)
    }

    closeNotif = () => {
        this.setState({
            notif:<></>
        })
    }

    doSuggestion = () => {

    }

    endgameb = () => {
        window.location = 'town/arena-house'
    }

    preparefight = () => {

    }

    componentDidMount(){
        this.setState({
            notif:(<NotificationTable textData="Ещё не готово!" clickFunc={this.closeNotif} />)
        })
    }


    render()
    {
        return (<main id="pvp-fight--main">
            {this.state.notif}
            <section id="pvp-fight--log">
            {this.state.log}
            </section>
            <InputElement key='inpan' mclass='input--label' iname='pvp-fight--suggestion' elclass='input--field' buttonName="Введите текущие приёмы" />
            <button id="pvp-fight--suggest" className="pvp-fight--button" onClick={this.doSuggestion}>{">>"}</button>
            <button id="pvp-fight--quit" className="pvp-fight--button" onClick={this.endgameb} >Сдаться</button>
            <button id="pvp-fight--items" className="pvp-fight--button">Предметы</button>
        </main>)
    }
}