import React from "react"
import InputElement, { LogElement } from "../../easyelem"
import './scarecrowstyle.css'
import axios from 'axios'
import NotificationTable, { InputNotification } from "../../notificationContainer"
export default class Scarecrow extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            num:null,
            pid:JSON.parse(localStorage.getItem('id')),
            glog:[],
            plog:[],
            slog:[],
            hp:50,
            shp:50,
            notif:<></>
        }

        this.bottomRef = React.createRef()
        this.pbottomRef = React.createRef()
        this.sbottomRef = React.createRef()
        this.scrollToBottom = this.scrollToBottom.bind(this)
        
        this.generateLog = this.generateLog.bind(this)
        this.doSuggestion = this.doSuggestion.bind(this)
        this.fineSuggest = this.fineSuggest.bind(this)
        this.closeNotif = this.closeNotif.bind(this)
        this.claimb = this.claimb.bind(this)
        this.endgameb = this.endgameb.bind(this)
        this.leavepage = this.leavepage.bind(this)
    }

    scrollToBottom = () => {
    //     this.bottomRef.scrollIntoView({ behavior: "smooth" });
    //     this.pbottomRef.scrollIntoView({ behavior: "smooth" });
    //     this.sbottomRef.scrollIntoView({ behavior: "smooth" });
    }

    leavepage = () => {
        window.location = "town/arena-house"
    }

    closeNotif = () => {
        this.setState({notif:<></>})
    }

    generateLog = (author,mdata,uid) => {
        return <LogElement author={author} textData={mdata} key={uid} />
    }

    fineSuggest = (text) => {
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

    claimb = () => {
        const nums = document.getElementsByName('fight--pick')[0].value
        console.log(nums)
        if(this.fineSuggest(nums))
        {
            axios.post('http://25.73.147.11:46291/crowscare-set-number',{pid:JSON.parse(localStorage.getItem('id')), setting:nums})
            .then((res) => {
                if(res.data.message === 'success'){
                    this.closeNotif()
                    this.setState({
                        num:nums
                    })
                }
            })
            return true
        }
        return false
    }

    endgameb = () => {
        axios.post('http://25.73.147.11:46291/crowscare-end-game',{pid:JSON.parse(localStorage.getItem('id'))})
            .then((res) => {
                if(res.data.message === 'success'){
                    window.location = 'town/arena-house'
                }
            })
    }

    doSuggestion = () => {
        let text = document.getElementsByName("fight--suggestion")[0].value
        if(this.fineSuggest(text))
        {
            axios.post('http://25.73.147.11:46291/crowscare-game-suggestion', {pid:JSON.parse(localStorage.getItem('id')), suggest:text})
            .then(res => {
                    console.log(res.data.php)
                    console.log(res.data.shp)
                    this.setState(prevState => ({
                        glog:[...prevState.glog, ...res.data.glogs],
                        plog:[...prevState.plog, res.data.plog],
                        slog:[...prevState.slog, res.data.log],
                        hp:res.data.php,
                        shp:res.data.shp
                    }))

                    this.scrollToBottom()

                    if(res.data.state)
                    {
                        this.setState({
                            notif: <NotificationTable textData={res.data.state} clickFunc={this.leavepage} />
                        })
                    }
                })
        }
        else
        {
            this.setState({
                notif: <NotificationTable textData="Неверно введено число!" clickFunc={this.closeNotif} />
            })
        }
    }

    componentDidMount()
    {
        if(this.state.pid&&!this.state.started)
        {
            this.setState({started:true})
            axios.post('http://25.73.147.11:46291/crowscare-game-start', {pid:JSON.parse(localStorage.getItem('id')), pname:JSON.parse(localStorage.getItem('name'))})
            .then(res => {
                if(!res.data.num)
                {
                    this.setState({
                        notif:<InputNotification text="Введите ваш набор движений(4 числа от 0 до 9ти без пробелов и повторений (пример:1234/9032))" bname="Введите набор защитных приёмов" startfunc={this.claimb} leavefunc={this.endgameb} claimb="Подготовка завершена" closeb="Сдаться" />
                    })
                }
                else
                {
                    this.setState({
                        num:res.data.num,
                        glog:res.data.glog,
                        plog:res.data.plog,
                        slog:res.data.log,
                        shp:res.data.shp,
                        hp:res.data.php
                    })
                }

            })
        }
        else
        {

            window.location = 'town'
        }
    }

    render() {
        return (<main id="fight--main">
                {this.state.notif}
            <div id="hp--player">{this.state.hp}</div>
            <div id="num--player">{this.state.num}</div>
            <div id="hp--scarecrow">{this.state.shp}</div>
            <section id="fight--log">
                {this.state.glog.map((data, i) => <div className="text--container" key={"glog-"+i}><p className="text--author">{data.author}</p><p className="text--damage">Нанесено <span className="damage--text-style">{data.dmg}</span> ед. урона</p></div>)}
                <div ref={this.bottomRef} />
            </section>
            <p id="player--name">{JSON.parse(localStorage.getItem("name"))}</p>
            <section id="fight--plog">
                {this.state.plog.map((data, i) => <div className="ptext--container" key={"plog-"+i}><p className="text--nums">{data.nums}</p><p className="text--ans">{data.ans[0]}:{data.ans[1]}</p></div>)}
                <div ref={this.pbottomRef} />
            </section>
            <p id="scarecrow--name">Пугало</p>
            <section id="fight--slog">
                {this.state.slog.map((data, i) => <div className="ptext--container" key={"slog-"+i}><p className="text--nums">{data.num}</p><p className="text--ans">{data.ans[0]}:{data.ans[1]}</p></div>)}
                <div ref={this.sbottomRef} />
            </section>
            <InputElement key='inpan' mclass='input--label' iname='fight--suggestion' elclass='input--field' buttonName="Введите текущие приёмы" />
            <button id="fight--suggest" className="fight--button" onClick={this.doSuggestion}>{">>"}</button>
            <button id="fight--quit" className="fight--button" onClick={this.endgameb} >Сдаться</button>
            <button id="fight--items" className="fight--button">Предметы</button>
        </main>)
    }
}