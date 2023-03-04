import React from "react"
import InputElement from "./easyelem"
import axios from 'axios'
import validator from "validator"
import './loginpagestyle.css'

export default class Loginpage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            elem: <Login />,
            togglebutton:"Регистрация"
        }
        this.changeState = this.changeState.bind(this)
    }

    componentDidMount()
    {
      if(localStorage.getItem('id'))
      {
        window.location = '/town'
      }
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

      axios.post('http://25.73.147.11:57159/register',{uname: username,
      umail: useremail,
      upassword: userpassword})
      .then((res) => {
        inlineEdit("attentionRegText", res.data.message)
        if(res.data.success)
        {
          if(window.confirm("Сохранить данные для входа?"))
          {
            localStorage.setItem("cow-bull--prefemail", JSON.stringify(useremail))
          }
          
          localStorage.setItem("name", JSON.stringify(username))
          localStorage.setItem("email", JSON.stringify(useremail))

          localStorage.setItem("id", JSON.stringify(res.data.userid))
          localStorage.setItem("login-state", JSON.stringify(true))
          localStorage.setItem("login-key", JSON.stringify(res.data.lkey))
          window.location = 'town'
        }
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    return(
      <section id='register'>
        <p id ="attentionRegText"></p>
        <InputElement key='mail' mclass='input--label' buttonName='Почта' itype='email' iname='email' elclass='input--field' />
        <InputElement key='uname' mclass='input--label' buttonName='Имя' itype='text' iname='username' elclass='input--field' />
        <InputElement key='upass' mclass='input--label' buttonName='Пароль' itype='password' iname='password' elclass='input--field' />
        <InputElement key='urep' mclass='input--label' buttonName='Повтор пароля' itype='password' iname='repeatPassword' elclass='input--field' />
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

  let i = 0
  while(i < uname.length)
  {
    if(uname[i] === "<" || uname[i] === ">")
    {
      inlineEdit(fid, "Недопустимый символ в имени")
      return false
    }
    i++
  }
  i = 0
  while(i < email.length)
  {
    if(email[i] === "<" || email[i] === ">")
    {
      inlineEdit(fid, "Недопустимый символ в почте")
      return false
    }
    i++
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

    axios.post('http://25.73.147.11:57159/login',{umail: email,
      upassword: pass,
      lkey: JSON.parse(localStorage.getItem("login-key"))
    })
    .then(res => {
      inlineEdit(lgn, res.data.message)
      if(res.data.message === "Успешный вход")
      {
        if(window.confirm("Сохранить данные для входа?"))
        {
          localStorage.setItem("cow-bull--prefemail", JSON.stringify(email))
        }      
        localStorage.setItem("name", JSON.stringify(res.data.name))
        localStorage.setItem("email", JSON.stringify(email))
        localStorage.setItem("id", JSON.stringify(res.data.uid))
        localStorage.setItem("login-state", JSON.stringify(true))
        localStorage.setItem("login-key", JSON.stringify(res.data.lkey)) // необходимо изменить позднее в функцию валидации логина

        window.location = 'town'
    }
    })
    .catch(err => console.log(err))
  }

  render() {
    return(
      <section id="login">
        <p id="attentionLogText"></p>
        <InputElement key='mail' mclass='input--label' buttonName='Почта' itype='email' iname='email' elclass='input--field' dValue={JSON.parse(localStorage.getItem("cow-bull--prefemail"))} />
        <InputElement key='pass' mclass='input--label' buttonName='Пароль' itype='password' iname='password' elclass='input--field' />
        <button name="submitForm" className='login-menu--button' onClick={this.getLogining}> Войти </button>
      </section>
    )
  }
}