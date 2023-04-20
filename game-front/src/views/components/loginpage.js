import React from "react"
import InputElement from "./easyelem"
import axios from 'axios'
import validator from "validator"
import './loginpagestyle.css'
import NotificationTable from "./notificationContainer"

export default class Loginpage extends React.Component
{
    constructor(props)
    {
        super(props)
        const queryParams = new URLSearchParams(window.location.search)

        this.state = {
            msg:queryParams.get('msg'),
            elem: <Login />,
            togglebutton:"Регистрация",
            notif:<></>
        }
        this.changeState = this.changeState.bind(this)
        this.closeMessage = this.closeMessage.bind(this)
    }

    componentDidMount()
    {
      if(localStorage.getItem('id'))
      {
        window.location = '/town'
      }
      else if(this.state.msg==="invalidkey")
      {
        this.setState({
          notif:<NotificationTable textData="Ошибка -806(ошибка при верификации аккаунта) Пожалуйста, войдите снова" clickFunc={this.closeMessage} />
        })
      }
      else if(this.state.msg==="leave")
      {
        this.setState({
          notif:<NotificationTable textData="Вы вышли из аккаунта" clickFunc={this.closeMessage} />
        })
      }
    }

    closeMessage = () => {
      this.setState({
        notif:<></>
      })
    }

    changeState = () => {
        if(this.state.togglebutton==="Регистрация")
        {
            this.setState({
                elem: <Register />,
                togglebutton:"Вход"
            })
        }
        else
        {
            this.setState({
                elem:<Login />,
                togglebutton:"Регистрация"
            })
        }
    }

    render(){
      
        return <main id="login--container">
          {this.state.notif}
            <div id="login--field">
            {this.state.elem}
            <button className='login-menu--button' onClick={this.changeState}>{this.state.togglebutton}</button>
            </div>
        </main>
    }
}

class Register extends React.Component
{

  constructor(props)
  {
    super(props)
    this.getRegistered = this.getRegistered.bind(this)
  }

  getRegistered = function()
  {
    const username = document.getElementsByName("username")[0].value
    const useremail = document.getElementsByName("email")[0].value
    const userpassword = document.getElementsByName("password")[0].value
    const userRepeatPassword = document.getElementsByName("repeatPassword")[0].value

    if(checkedData(username, useremail, userpassword, userRepeatPassword))
    {

      axios.post('http://25.73.147.11:46291/register',{uname: username,
      umail: useremail,
      upassword: userpassword})
      .then((res) => {
        inlineEdit("attentionRegText", res.data.message)
        console.log(res.data.success)
        if(res.data.success)
        {
          axios.post('http://25.73.147.11:57159/add-new-user-props', {id:res.data.uid, name:username})
          .then((ret) => {
            console.log('here we are')
            localStorage.setItem("name", JSON.stringify(username))
            localStorage.setItem("email", JSON.stringify(useremail))

            localStorage.setItem("id", JSON.stringify(res.data.uid))
            localStorage.setItem("login-state", JSON.stringify(true))
            localStorage.setItem("login-key", JSON.stringify(res.data.lkey))
            
            window.location = 'town'
          })
        }
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    return(
      <section id='register'>
        <p id ="attentionRegText"></p>
        <InputElement key='mail' mclass='r-input--label' buttonName='Почта' itype='email' iname='email' elclass='r-input--field' />
        <InputElement key='uname' mclass='r-input--label' buttonName='Имя' itype='text' iname='username' elclass='r-input--field' />
        <InputElement key='upass' mclass='r-input--label' buttonName='Пароль' itype='password' iname='password' elclass='r-input--field' />
        <InputElement key='urep' mclass='r-input--label' buttonName='Повтор пароля' itype='password' iname='repeatPassword' elclass='r-input--field' />
        <button name="submitForm" className='login-menu--button' onClick={this.getRegistered}> Зарегистрироваться </button>
      </section>
    )
  }

}


function inlineEdit(fieldId, textMessage)
{
  document.getElementById(fieldId).innerText = textMessage
}

function checkedData(uname, email, pass, repeatpass)
{
  let fid = "attentionRegText"

  if(uname.length > 10)
  {
    inlineEdit(fid, "Имя должно быть не длиннее 10ти символов")
    return false
  }
  if(email.length > 50)
  {
    inlineEdit(fid, "Слишком длинный адрес почты")
    return false
  }
  if(pass.length > 30)
  {
    inlineEdit(fid, "Слишком длинный пароль")
    return false
  }
  if(uname.indexOf('<')!==-1||uname.indexOf('>')!==-1||uname.indexOf('{')!==-1||uname.indexOf('}')!==-1||uname.indexOf('$')!==-1)
  {
    inlineEdit(fid, "Недопустимый символ в имени")
      return false
  }
  if(email.indexOf('<')!==-1||email.indexOf('>')!==-1||email.indexOf('{')!==-1||email.indexOf('}')!==-1||email.indexOf('$')!==-1)
  {
    inlineEdit(fid, "Недопустимый символ в почте")
      return false
  }
  if(uname.length < 3)
  {
    inlineEdit(fid, "Имя должно быть не короче трёх символов")
    return false
  }
  if(pass.length < 8)
  {
    inlineEdit(fid, "Пароль должен иметь длину не менее 8 символов")
    return false
  }
  if(pass !== repeatpass)
  {
    inlineEdit(fid, "Пароли не совпадают")
    return false
  }
  if(!validator.isEmail(email))
  {
    inlineEdit(fid, "Неверная почта")
    return false
  }

  return true
}


class Login extends React.Component
{
  constructor(props)
  {
    super(props)
    this.getLogining = this.getLogining.bind(this)
  }
  
  getLogining = function()
  {
    const email = document.getElementsByName("email")[0].value
    const pass = document.getElementsByName("password")[0].value
    let lgn = "attentionLogText"

    if(!validator.isEmail(email))
    {
      inlineEdit(lgn, "Неверная почта")
      return false
    }
    if(email.length>50)
    {
      inlineEdit(lgn, "Почта слишком длинная")
      return false
    }
    if(pass.length>30)
    {
      inlineEdit(lgn, "Неверный пароль(более 30ти символов)")
      return false
    }
    if(pass.length<8)
    {
      inlineEdit(lgn, "Неверный пароль(менее 8ми символов)")
      return false
    }

    axios.post('http://25.73.147.11:46291/login',{umail: email,
      upassword: pass
    })
    .then(res => {
      inlineEdit(lgn, res.data.message)
      
      if(res.data.message === "Успешный вход")
      {
        if(res.data.state)
        {
          axios.post('http://25.73.147.11:57159/add-new-user-props', {id:res.data.uid, name: res.data.name})
          .then(ret => {
            localStorage.setItem("name", JSON.stringify(res.data.name))
            localStorage.setItem("email", JSON.stringify(email))
            localStorage.setItem("id", JSON.stringify(res.data.uid))
            localStorage.setItem("login-state", JSON.stringify(true))
            localStorage.setItem("login-key", JSON.stringify(res.data.lkey))
    
            window.location = 'town'
          })
        }
        else
        {
          localStorage.setItem("name", JSON.stringify(res.data.name))
          localStorage.setItem("email", JSON.stringify(email))
          localStorage.setItem("id", JSON.stringify(res.data.uid))
          localStorage.setItem("login-state", JSON.stringify(true))
          localStorage.setItem("login-key", JSON.stringify(res.data.lkey))

          window.location = 'town'
        }

    }
    })
    .catch(err => console.log(err))
  }

  render() {
    return(
      <section id="login">
        <p id="attentionLogText"></p>
        <InputElement key='mail' mclass='r-input--label' buttonName='Почта' itype='email' iname='email' elclass='r-input--field' dValue={JSON.parse(localStorage.getItem("cow-bull--prefemail"))} />
        <InputElement key='pass' mclass='r-input--label' buttonName='Пароль' itype='password' iname='password' elclass='r-input--field' />
        <button name="submitForm" className='login-menu--button' onClick={this.getLogining}> Войти </button>
      </section>
    )
  }
}