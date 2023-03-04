import React from "react"
import axios from 'axios'

export default class Profile extends React.Component
{
    constructor(props){
        super(props)
        const queryParams = new URLSearchParams(window.location.search)
        this.state = {
            id:queryParams.get('id'),
            uname:queryParams.get('name'),
            follow:null,
            guild:null,
            friendButton:null,
            globalStat:null
        }
    }

    componentDidMount(){
        axios.post('http://25.73.147.11:57159/get-uinfo',{mid:JSON.parse(localStorage.getItem('id')),uid:this.state.id,})
        .then(res => {
            let butt
            if(res.data.follow.indexOf(this.state.id)!==-1)
            {
                if(res.data.ufollow.indexOf(JSON.parse(localStorage.getItem('id')))!==-1)
                {
                    butt = (<button id="profile--friend">Написать</button>)
                }
                else
                {
                    butt = (<p id="profile--added">Подписка оформлена</p>)
                }
            }
            else
            {
                butt=(<button id="profile--friend">Добавить в друзья</button>)
            }

            this.setState({
                follow:res.data.follow,
                guild:res.data.guild,
                friendButton:butt,
                globalStat:res.data.statistics
            })
        })
    }

    render() {
        return (<section id="profile--container">
            <div className="profile--block">
                <p id="profile--name">{this.state.uname}</p>
            </div>
            <div className="profile--block">
                <button id="profile--follow">
                    Подписчики
                </button>
                {this.state.friendButton}
            </div>
            <div className="profile--block">
                <button id="profile--statistics">{this.state.globalStat}</button>
            </div>
            <div className="profile--block">
                <button id="profile--guild">{this.state.guild}</button>
            </div>
        </section>)
    }
}