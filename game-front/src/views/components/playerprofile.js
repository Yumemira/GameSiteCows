import React from "react"
import axios from 'axios'
import './playerprofilestyle.css'

export default class Profile extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            id:props.pid,
            uname:props.pname,
            follow:null,
            guild:null,
            friendButton:null,
            globalStat:null,
            offunc:props.offunc
        }
        this.exitAccount = this.exitAccount.bind(this)
    }

    exitAccount = () => {
        localStorage.clear()
        window.location = "login?msg=leave"
    }

    componentDidMount(){
        axios.post('http://25.73.147.11:57159/get-uinfo',{mid:JSON.parse(localStorage.getItem('id')),uid:this.state.id})
        .then(res => {
            let butt
            if(!JSON.parse(localStorage.getItem('id'))===this.state.id)
            {
                if(res.data.follow&&res.data.follow.indexOf(this.state.id)!==-1)
                {
                    if(res.data.ufollow&&res.data.ufollow.indexOf(JSON.parse(localStorage.getItem('id')))!==-1)
                    {
                        butt = (<button id="profile--button">Написать</button>)
                    }
                    else
                    {
                        butt = (<p id="profile--text">Подписка оформлена</p>)
                    }
                }
                else
                {
                    butt=(<button id="profile--button">Добавить в друзья</button>)
                }
            }
            else
            {
                butt = <></>
            }
            if(res.data.guild===-1)
            {
                this.setState({
                    follow:res.data.follow,
                    guild:"отсутствует",
                    friendButton:butt,
                    globalStat:res.data.statistics
                })
            }
            else
            {
                axios.post('http://25.73.147.11:57159/fetch-guild',{id:res.data.guild})
                .then(ret => {
                    this.setState({
                        follow:res.data.follow,
                        guild:ret.data.name,
                        friendButton:butt,
                        globalStat:res.data.statistics
                    })                    
                })
            }
        
        })
    }

    render() {
    return (<section id="profile--container">
            <button id="profile--hide" onClick={this.state.offunc}>X</button>
        <div className="profile--block">
            <p id="profile--text">{this.state.uname}</p>
        </div>
        <div className="profile--block">
            <button id="profile--button">
                Подписчики
            </button>
            {this.state.friendButton}
        </div>
        <div className="profile--block">
            <button id="profile--button">{this.state.globalStat}</button>
        </div>
        <div className="profile--block">
            <button id="profile--button">{this.state.guild}</button>
        </div>
        <div className="profile--block">
            {this.state.id===JSON.parse(localStorage.getItem('id'))?<button id="profile--button" onClick={this.exitAccount}>Выйти</button>:<></>}
        </div>
    </section>)
    }
}