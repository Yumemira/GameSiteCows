import React from "react"
import './playboardstyle.css'
import axios from 'axios'
import Profile from "./playerprofile"

export default class Playerboard extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            pid:JSON.parse(localStorage.getItem('id')),
            nickname:null,
            hp:0,
            ep:0,
            prof:<></>
        }
        this.openProile = this.openProile.bind(this)
        this.closeProfile = this.closeProfile.bind(this)
    }
    closeProfile = () => {
        this.setState({
            prof:<></>
        })
    }

    openProile = () => {
        this.setState({
            prof:<Profile pid={this.state.pid} key={`pr`+this.state.pid} pname={this.state.nickname} offunc={this.closeProfile} />
            })
    }

    componentDidMount()
    {
        axios.post('http://25.73.147.11:57159/p-stat',{id:this.state.pid})
        .then( res => {
            this.setState({
                nickname:res.data.nickname,
                hp:res.data.hp,
                ep:res.data.ep
            })
        })
    }

    render()
    {
        return (<section id="main--header">
            {this.state.prof}
            <button id="button--profile" onClick={this.openProile}>{this.state.nickname}</button>
            <p id="pointer--hp-bar">{this.state.hp}</p>
            <p id="pointer--ep-bar">{this.state.ep}</p>
            <p id="pointer--premium"></p>
        </section>)
    }
}