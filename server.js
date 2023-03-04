require('dotenv').config()
const http = require('http')
const express = require("express")
const cors = require('cors')
const { Server } = require("socket.io")
const tools = require('./reqtools.js')

const hostname = '25.73.147.11'
const app = express()
const port = process.env.DEFAULT_PORT

app.use(express.urlencoded())
app.use(cors({origin: process.env.REACT_FRONT_PATH}))
app.use(express.json())

var playerstats = []
var premStats = []
var guildstats = []



const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin:"http://25.73.147.11:45932",
      methods: ['GET', 'POST']
    },
})


app.get('/', function(req,res){
    res.json({message:"success"})
})

app.post('/get-uinfo',function(req, res){
  tools.queryToDbMain(`select follow from userstable where id=$1 limit 1`,[req.body.mid])
  .then(ret => {
    tools.queryToDbMain(`select guild, follow userstable where id=$1 limit 1`, [req.body.uid])
    .then(retu => {
      
    })
  })
})

app.post("/register",function(req, res){
    const uname = req.body.uname
    const umail = req.body.umail
    const upass = req.body.upassword
  
  
    tools.queryToDbMain("select email from userstable where email = $1 limit 1", [umail])
    .then((ret) => {
      if(ret.length === 0)
      {
        const unicKey = tools.unicNumGenerator();
  
        tools.queryToDbMain(`
        INSERT INTO userstable (name, email, password, loginkey, state)
        VALUES ($1,$2,$3,$4, 'o');`, [uname, umail, upass, unicKey])
        .then(() => {
          tools.queryToDbMain(`select id from userstable where email = $1 limit 1`,[umail])
          .then(uret => {
            let tid = uret[0].id
            tid = parseInt(tid)
            res.json({message: "Успешная регистрация", lkey: unicKey, success: true, userid: uret[0].id});
          });
        })
      }
      else
      {
        res.json({message: "Эта почта уже занята", success: false});
      }
    });
  });
  
  app.post("/login",function(req, res){
    const umail = req.body.umail;
    const upass = req.body.upassword;
    const lkey = req.body.loginkey;
  
    tools.queryToDbMain(`select id, password, loginkey, name from userstable where email = $1 limit 1`, [umail])
    .then((ret) => {
      if(ret.length === 0||ret[0].password !== upass)
      {
        res.json({message: "Невереный логин или пароль"});
      }
      else
      {
        console.log(`Id of user is: ${ret[0].id}`)
        console.log(`Login key is ${ret[0].loginkey}`)
        
        if(ret[0].loginkey === lkey)
        {
          res.json({uid: ret[0].id, name: ret[0].name, message: "Успешный вход", lkey: ret[0].loginkey});
        }
        else
        {
          
          res.json({/*message: "Точка входа неизвестна"*/ message: "Успешный вход",
          requireMessage:"Пожалуйста, подтвердите новую точку входа",
          uid: ret[0].id, name: ret[0].name, lkey: ret[0].loginkey});    
        }
      }
    });
  });

app.post('/newcomer', function(req,res){
    let tommorow = tools.addDays(1)
    tools.queryToDb(`insert into "Player" (id, premium) values($1, $2)`,[req.body.id, tommorow])
    tools.queryToDb(`insert into hpBackups (id, hp, ep) values ($1,50, 50)`,[req.body.id])
    playerstats.push({id:req.body.id,hp:50,ep:50})
})

app.post('/p-stat', function(req,res){
    console.log(`this is: ${playerstats}`)
    //res.json({hp:playerstats.find(x => x.id === req.body.id).hp, ep:playerstats.find(x => x.id === req.body.id).ep})
})



server.listen(port, hostname, () => {
    console.log(`successful start!`)
    tools.queryToDb('select * from "hpBackups"')
    .then(
        ret => {
            if(ret.length > 0) playerstats = ret
            console.log(`Всего игроков: ${playerstats.length}||${ret.length}`)
        }
    )

    tools.queryToDb('select id, premium from "Player"')
    .then(ret => {
        if(ret.length > 0) premStats = ret
    })
})