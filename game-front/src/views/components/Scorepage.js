import axios from "axios"
import React from "react"
import ScoreElem from "./Scoreelem"

export default class Scorepage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            pid:props.pid,
            pscore:{},
            score:[],
            sectionpage:[],
            minId:0
        }

        this.setScore = this.setScore.bind(this)
        this.setKills = this.setKills.bind(this)
        this.setWins = this.setWins.bind(this)
        this.setLoses = this.setLoses.bind(this)
        this.settingsChange = this.settingsChange.bind(this)
    }

    setScore = () => {
        axios.get('http://25.73.147.11:57159/score-score')
        .then(res => {
            this.settingsChange(res.data.score)
        })
    }

    setKills = () => {
        axios.get('http://25.73.147.11:57159/score-kills')
        .then(res => {
            this.settingsChange(res.data.score)
        })
    }

    setWins = () => {
        axios.get('http://25.73.147.11:57159/score-wins')
        .then(res => {
            this.settingsChange(res.data.score)
        })
    }

    setLoses = () => {
        axios.get('http://25.73.147.11:57159/score-loses')
        .then(res => {
            this.settingsChange(res.data.score)
        })
    }

    settingsChange = (sc) => {
        let max
        if(sc.length>20)
        {
            max = 20
        }
        else
        {
            max = sc.length
        }
    
        let score = []
        for(let i = 0; i<max;i++)
        {
            score.push(<ScoreElem eid={i+1} key={'s'+i} pname={sc[i].name} scoretext={sc[i].score} />)
        }

        this.setState(prevState=>({
            minId:max,
            score:sc,
            pscore:sc.find(x => x.id === prevState.pid),
            sectionpage:score
        }))
    }

    

    componentDidMount(){
        this.setScore()
    }

    render()
    {
        return (<div>
            <nav id="score--nav">
                <button className="score--button">Всего очков</button>
                <button className="score--button">Повержено</button>
                <button className="score--button">Побед на арене</button>
                <button className="score--button">Поражений</button>
            </nav>
            <section id="score--block">
                {this.state.sectionpage}
            </section>
        </div>)
    }
}