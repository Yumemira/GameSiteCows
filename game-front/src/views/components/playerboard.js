import React from "react"
import './playboardstyle.css'
import axios from 'axios'

export default class Playerboard extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            pid:props.pid,
            nickname:null,
            hp:0,
            ep:0
        }
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
            <button id="button--profile">{this.state.nickname}</button>
            <p id="pointer--hp-bar">{this.state.hp}</p>
            <p id="pointer--ep-bar">{this.state.ep}</p>
            <p id="pointer--premium"></p>
        </section>)
    }
}