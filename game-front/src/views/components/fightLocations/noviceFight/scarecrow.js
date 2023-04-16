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
            pid:JSON.parse(localStorage.getItem('id')),
            log:[],
            notif:<></>
        }

        this.generateLog = this.generateLog.bind(this)
        this.doSuggestion = this.doSuggestion.bind(this)
        this.fineSuggest = this.fineSuggest.bind(this)
        this.closeNotif = this.closeNotif.bind(this)
        this.claimb = this.claimb.bind(this)
        this.endgameb = this.endgameb.bind(this)
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
            axios.post('http://25.73.147.11:46291/crowscare-game-suggestion',{pid:JSON.parse(localStorage.getItem('id')), suggest:text})
            .then(res => {
                    let msgp = ""
                    if(res.data.message[0]>0)
                    {
                        msgp+=` ${res.data.message[0]} удар(ов)`
                    }
                    if(res.data.message[1]>0)
                    {
                        msgp+=` ${res.data.message[1]} касаний`
                    }
                    if(msgp.length === 0) msgp = " Блок не был пробит"
                    
                    this.setState(prevState => ({
                        log:[...prevState.log, this.generateLog(JSON.parse(localStorage.getItem('name')), text+msgp, `lp${this.state.log.length+1}`)]
                    }))

                    let msgb = ""
                    if(res.data.act.ans[0]>0)
                    {
                        msgb+=` ${res.data.act.ans[0]} удар(ов)`
                    }
                    if(res.data.act.ans[1]>0)
                    {
                        msgb+=` ${res.data.act.ans[1]} касаний`
                    }
                    if(msgb.length === 0) msgb = " Блок не был пробит"
                    
                    this.setState(prevState => ({
                        log:[...prevState.log, this.generateLog("Пугало", res.data.act.num.join('')+msgb, `lp${this.state.log.length}`)]
                    }))

                    if(res.data.state)
                    {
                        console.log(res.data.state)
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
                let log = []
                for(let i = 0; i< res.data.start.length; i++)
                {
                    log.push(this.generateLog(res.data.start[i].author, res.data.start[i].msg,`lp${i}`))
                }
                if(res.data.message)
                {
                    for(let i = 0; i< res.data.message.length; i++)
                    {
                        log.push(this.generateLog(res.data.message[i].author, res.data.message[i].msg,`lp${i}`))
                    }   
                }
                if(!res.data.num)
                {
                    this.setState({
                        notif:<InputNotification text="Введите ваш набор движений(4 числа от 0 до 9ти без пробелов и повторений (пример:1234/9032))" bname="Введите набор защитных приёмов" startfunc={this.claimb} leavefunc={this.endgameb} claimb="Подготовка завершена" closeb="Сдаться" />
                    })
                }

                this.setState({
                    log:log
                })
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
            <section id="fight--log">
            {this.state.log}
            </section>
            <InputElement key='inpan' mclass='input--label' iname='fight--suggestion' elclass='input--field' buttonName="Введите текущие приёмы" />
            <button id="fight--suggest" className="fight--button" onClick={this.doSuggestion}>{">>"}</button>
            <button id="fight--quit" className="fight--button" onClick={this.endgameb} >Сдаться</button>
            <button id="fight--items" className="fight--button">Предметы</button>
        </main>)
    }
}