import React from "react"
import classnames from "classnames"
import './easyelemstyle.css'

export default class InputElement extends React.Component
{
  constructor(props)
  {
    super(props)
    
    this.state = {
      text:props.buttonName,
      itype:props.itype,
      dValue:props?.dValue,
      iname:props.iname,
      clearInput: props.dValue === undefined|props.dValue===null,
      elid:props.elid,
      elclass:props.elclass,
      mclass:props.mclass
    }
    this.getInput = this.getInput.bind(this)
  }

  getInput = (e) => {
    this.setState({clearInput:(e.target.value.length === 0)})
  }

  render()
  {
    return (
    <div className={this.state.mclass}>
      <span className={classnames("--visibled", {
            "--hidden": !this.state.clearInput
          })}>{this.state.text}</span>
      <input type={this.state.itype} className={this.state.elclass} name={this.state.iname} id={this.state.elid} onChange={this.getInput} defaultValue={this.state.dValue} autoComplete='off'></input>
    </div>);
  }
}

export class LogElement extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      text:props.textData,
      author:props.author
    }

  }
  render()
  {
    return(<div className="log--block">
      <p className="log--name">{this.state.author}:</p><p className="log--text">{this.state.text}</p>
      </div>)
  }
}