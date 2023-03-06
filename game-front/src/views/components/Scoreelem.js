import React from "react"
import './Scoreelemstyle.css'

export default class ScoreElem extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            eid:props.eid,
            pname:props.pname,
            scoretext:props.score
        }
    }
    render()
    {
        return (<div className="score--elem">
            <p className="score--text">{this.state.eid}</p>
            <p className="score--text">{this.state.pname}</p>
            <p className="score--text">{this.state.scoretext}</p>
        </div>)
    }
}