import React from "react"
import InputElement from "./easyelem"
import './notificationstyle.css'

export default class NotificationTable extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            text: props.textData,
            clickFunc:props.clickFunc,
            living:true
        }
        this.setDelete = this.setDelete.bind(this)
    }
    
    setDelete = () => {
        this.state.clickFunc()
        this.setState({
            living:false,
            text:''
        })
    }


    render(){
        return (<> {this.state.living?(<div className="notification--clickable" onClick={this.setDelete}>
            <section className="notification--block" >
                <p className="notification--message">{this.state.text}</p>
            </section>
        </div>):<></>
        }
        </>)
    }
}

export class InputConfirm extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            text:props.textData,
            confirm:props.clickFunc,
            cancel:props.cancelb,
            timer:10
        }

        setInterval(() => {
            this.setState(prevState => ({
                timer:prevState.timer-1
            }))
        }, 1000)
    }

    render(){
        if(this.state.timer === 0)
        {
            this.state.cancel()
        }
        return (<section id="notif-t--field">
            <p id="notif--text">{this.state.text}<span className="color--text">{this.state.timer}</span></p>
            <button id="notif--confirm" onClick={this.state.confirm}>Принять</button>
            <button id="notif--cancel" onClick={this.state.cancel}>Отказаться</button>
        </section>)
    }
}

export class InputNotification extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            text:props.text,
            bname:props.bname,
            startfunc:props.startfunc,
            leavefunc:props.leavefunc,
            claimb:props.claimb,
            cancelb:props.closeb
        }
        this.start = this.start.bind(this)
    }

    start = () => {
        if(!this.state.startfunc())
        {
            this.setState({
                text:"Неверное число!"
            })
        }
    }

    render()
    {
        return(<section id="notif--main">
            <p id="notif--text">{this.state.text}</p>
            <InputElement key='sinp' mclass='notif-i--label' iname='fight--pick' elclass='notif-i--field' buttonName={this.state.bname} />
            <button id="notif--start" className="notif--button" onClick={this.start}>{this.state.claimb}</button>
            <button id="notif--back" className="notif--button" onClick={this.state.leavefunc} >{this.state.cancelb}</button>
        </section>)
    }
}