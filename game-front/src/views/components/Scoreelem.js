import React from "react"
import Profile from "./playerprofile"
import './Scoreelemstyle.css'

export default class ScoreElem extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            pid:props.pid,
            eid:props.eid,
            pname:props.pname,
            scoretext:props.score,
            prof:<></>
        }

        this.openProfile = this.openProfile.bind(this)
        this.closeProfile = this.closeProfile.bind(this)
    }

    openProfile = () => {
        this.setState({
            prof:<Profile pid={this.state.pid} pname = {this.state.pname} offunc = {this.closeProfile} />
        })
    }
    closeProfile = () => {
        this.setState({
                prof:<></>
            })
    }

    render()
    {
        return (<div className="score--elem">
            {this.state.prof}
            <p className="score--text">{this.state.eid}</p>
            <button className="score--player" onClick={this.openProfile}>{this.state.pname}</button>
            <p className="score--text">{this.state.scoretext}</p>
        </div>)
    }
}