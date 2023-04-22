import React, { useContext, useEffect, useState } from 'react'
import './arenafightstyle.css'
import InputElement from '../../easyelem'
import NotificationTable from '../../notificationContainer'
import { SocketContext } from '../../socket'
import axios from 'axios'

const GameCollection = ({state, user, room}) => {
    console.log(state)
    console.log("twice!")
    const socket = useContext(SocketContext)
    const [waitingElem, setWaiting] = useState(<></>)

    useEffect(() => {
        if(!state)
        {
            setWaiting(<div id='bg--waiting'></div>)
            
            socket.emit("search_game", {user, room})
        }
        else
        {
            setWaiting(<div id='bg--waiting'></div>)
            socket.emit("start_game", {user, room})
        }
    }, [])

    useEffect(() => {
        socket.on("start", (data) => {
            console.log("starting completed!")
            setWaiting(<></>)
        })
    },[socket])

    return waitingElem
}
export default class Arenafight extends React.Component
{   

    constructor(props)
    {
        super(props)
        this.state = {
            statesearch:true,
            room:null,
            log:[],
            state:'prepare',
            waitnotif:<></>,
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
        axios.post('http://25.73.147.11:46291/pvp-game-preparation', {userid:JSON.parse(localStorage.getItem('id'))})
        .then(res => {
            const {state, room} = res.data
            this.setState({
                statesearch:state,
                room:room,
                waitnotif:<GameCollection state={state} room={room} user={JSON.parse(localStorage.getItem('id'))} />
            })
        })
    }


    render()
    {
        return (<main id="pvp-fight--main">
            {this.state.notif}
            {this.state.waitnotif}
            <InputElement key='inpan' mclass='input--label' iname='pvp-fight--suggestion' elclass='input--field' buttonName="Введите текущие приёмы" />
            <button id="pvp-fight--suggest" className="pvp-fight--button" onClick={this.doSuggestion}>{">>"}</button>
            <button id="pvp-fight--quit" className="pvp-fight--button" onClick={this.endgameb} >Сдаться</button>
            <button id="pvp-fight--items" className="pvp-fight--button">Предметы</button>
        </main>)
    }
}