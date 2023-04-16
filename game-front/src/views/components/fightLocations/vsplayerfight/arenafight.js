import React, { useContext, useEffect } from 'react'
import './arenafightstyle.css'
import InputElement from '../../easyelem'
import NotificationTable from '../../notificationContainer'
import { SocketContext } from '../../socket'
import axios from 'axios'

const GameCollection = ({user, room}) => {
    const socket = useContext(SocketContext)

    useEffect(() => {

    },[socket])

    return (<section id="pvp-fight--log">

    </section>)
}
export default class Arenafight extends React.Component
{   

    constructor(props)
    {
        super(props)
        this.state = {
            room:null,
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
        axios.post('http://25.73.147.11:46291/arena-fight--game-start',{pid:JSON.parse(localStorage.getItem('id'))})
        .then(res => {
            this.setState({
                room:res.data.room
            })
        })
    }


    render()
    {
        return (<main id="pvp-fight--main">
            {this.state.notif}
            <GameCollection />
            <InputElement key='inpan' mclass='input--label' iname='pvp-fight--suggestion' elclass='input--field' buttonName="Введите текущие приёмы" />
            <button id="pvp-fight--suggest" className="pvp-fight--button" onClick={this.doSuggestion}>{">>"}</button>
            <button id="pvp-fight--quit" className="pvp-fight--button" onClick={this.endgameb} >Сдаться</button>
            <button id="pvp-fight--items" className="pvp-fight--button">Предметы</button>
        </main>)
    }
}