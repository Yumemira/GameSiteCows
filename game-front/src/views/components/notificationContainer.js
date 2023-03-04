import React from "react"
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