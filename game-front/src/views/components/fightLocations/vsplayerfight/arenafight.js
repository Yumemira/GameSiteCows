import React, { useContext, useEffect, useState } from 'react'
import './arenafightstyle.css'
import InputElement from '../../easyelem'
import NotificationTable, { InputNotification, InputConfirm } from '../../notificationContainer'
import { SocketContext } from '../../socket'
import axios from 'axios'

const GameUI = ({state, user, room}) => {
    const socket = useContext(SocketContext)
    const [place, setPlace] = useState(null)
    const [hp, setHp] = useState(0)
    const [num, setNum] = useState(0)
    const [shp, setShp] = useState(0)
    const [glog, setGlog] = useState([])
    const [blog, setBlog] = useState([])
    const [plog, setPlog] = useState([])
    const [slog, setSlog] = useState([])
    const [name, setName] = useState(null)
    const [startGame, setStartGame] = useState(false)
    const [ready, setReady] = useState(false)
    const [notif, setNotif] = useState(<></>)
    const [waitingElem, setWaiting] = useState(<></>)

    const fineSuggest = (text) => {
        if(isNaN(text)) return false
        if(text.length===4)
        {
            for(let i = 0; i < 4;i++)
            {
                if(text.split(text[i]).length-1>1) return false
            }     
            return true
        }
        return false
    }

    const leave = () => {
        socket.emit("leave_searching", {user, room})
        window.location = "town/arena-house"
    }

    let claimb = () => {
        const nums = document.getElementsByName('fight--pick')[0].value
        if(fineSuggest(nums))
        {
            socket.emit("number_attached", {nums, user, room})
            setNum(nums)
            setNotif(<></>)
        }
    }

    const loadOpponent = () => {
        axios.post("http://25.73.147.11:46291/pvp-game-loadstats", {id:user, room:room})
        .then((res) => {
            const {hp, place, shp, name} = res.data
            console.log(hp)
            console.log(place)
            console.log(shp)
            console.log(name)
            
            setHp(hp)
            setPlace(place)
            setShp(shp)
            setName(name)
        })
    }

    const doSuggestion = () => {
        const suggest = document.getElementsByName('fight--suggestion')[0].value
        if(fineSuggest(suggest))
        {
            socket.emit("number_suggest", {place, user, room, suggest})
        }
    }

    const endgameb = () => {
        window.location = 'town/arena-house'
    }

    const start = () => {
        setReady(true)
        socket.emit("prepared", {room})
        setNotif(<InputNotification text="Введите ваш набор движений(4 числа от 0 до 9ти без пробелов и повторений (пример:1234/9032))" bname="Введите набор защитных приёмов" startfunc={claimb} leavefunc={leave} claimb="Подготовка завершена" closeb="Сдаться" />)
        setWaiting(<></>)
    }

    useEffect(() => {
        if(!state)
        {
            setWaiting(<WaitElem leave={leave} />)
            
            socket.emit("search_game", {user, room})
        }
        else
        {
            setWaiting(<WaitElem leave={leave} />)
            socket.emit("start_game", {user, room})
        }
    }, [])

    useEffect(() => {
        socket.on("start", () => {
            setNotif(<InputConfirm textData="Игра найдена: " clickFunc={start} cancelb={leave} />)
        })

        socket.on("opponent-ready", () => {
            setStartGame(true)
            loadOpponent()
        })

        socket.on("cancel--game", () => {
            socket.emit("leave_searching", {user, room})
            window.location.reload()
        })

        socket.on("message", data => {
            const {name, text} = data
            setBlog([...blog, {author:name, text:text}])
        })

        socket.on("suggested", (data) => {
            if(data.user == JSON.parse(localStorage.getItem("id")))
            {
                setShp(data.hp)
                setPlog([...plog, data.log])
                if(data.won)
                {
                    setNotif(<NotificationTable textData="Вы победили!" clickFunc={leave} />)
                    socket.emit("end-game", {room})
                }
            }
            else
            {
                setHp(data.hp)
                setSlog([...slog, data.log])

                if(data.won)
                {
                    setNotif(<NotificationTable textData="Вы проиграли!" clickFunc={leave} />)
                }
            }

            setGlog([...glog, data.glog])
        })
    }, [socket, blog, glog, slog, place, plog, shp, hp, place])

    return(<section>
        {notif}
        {waitingElem}
         <div id="hp--player">{hp}</div>
        <div id="num--player">{num}</div>
        <div id="hp--scarecrow">{shp}</div>
        <section id="fight--log">
            {blog.map((data, i) => <div className="text--container" key={"blog-"+i}><p className="text--author">{data.author}</p><p className="text--damage">{data.text}</p></div>)}
            {glog.map((data, i) => <div className="text--container" key={"glog-"+i}><p className="text--author">{data.author}</p><p className="text--damage">Нанесено <span className="damage--text-style">{data.dmg}</span> ед. урона</p></div>)}
        </section>
        <p id="player--name">{JSON.parse(localStorage.getItem("name"))}</p>
        <section id="fight--plog">
            {plog.map((data, i) => <div className="ptext--container" key={"plog-"+i}><p className="text--nums">{data.nums}</p><p className="text--ans">{data.ans[0]}:{data.ans[1]}</p></div>)}
        </section>
        <p id="scarecrow--name">{name}</p>
        <section id="fight--slog">
            {slog.map((data, i) => <div className="ptext--container" key={"slog-"+i}><p className="text--nums">{data.nums}</p><p className="text--ans">{data.ans[0]}:{data.ans[1]}</p></div>)}
        </section>
        <InputElement key='inpan' mclass='input--label' iname='fight--suggestion' elclass='input--field' buttonName="Введите текущие приёмы" />
        <button id="fight--suggest" className="fight--button" onClick={doSuggestion}>{">>"}</button>
        <button id="fight--quit" className="fight--button" onClick={endgameb} >Сдаться</button>
    </section>)
}
class WaitElem extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            leave:props.leave,
            timer:0
        }

        this.interval = setInterval(() => {
            this.setState(prevState => ({
                timer:prevState.timer+1
            }))
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        return (<div id='bg--waiting'>
        <p id='timer--search'>Поиск соперника: {this.state.timer}</p>
        <button id='button--left-search' onClick={this.state.leave} >Покинуть очередь</button>
    </div>)
    }
}

export default class Arenafight extends React.Component
{   

    constructor(props)
    {
        super(props)
        this.state = {
            room:null,
            states:false,
            waitnotif:<></>,
            notif:<></>
        }
        this.doSuggestion = this.doSuggestion.bind(this)
        this.closeNotif = this.closeNotif.bind(this)
    }

    closeNotif = () => {
        this.setState({
            notif:<></>
        })
    }
    

    doSuggestion = () => {

    }

    

    preparefight = () => {

    }

    componentDidMount(){
        axios.post('http://25.73.147.11:46291/pvp-game-preparation', {userid:JSON.parse(localStorage.getItem('id'))})
        .then(res => {
            const {state, room} = res.data
            this.setState({
                room:room,
                states:state
                })
        })
    }


    render()
    {
        return (<main id="pvp-fight--main">
                {this.state.notif}
                {this.state.waitnotif}
            {this.state.room!=null?<GameUI state={this.state.states} user={JSON.parse(localStorage.getItem("id"))} room={this.state.room} />:null}
            
            <button id="fight--items" className="fight--button">Предметы</button>
        </main>)
    }
}