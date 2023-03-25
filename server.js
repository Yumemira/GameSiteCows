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
var scorestats = []
var premStats = []
var guildstats = []
var nicknames = []


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

app.get('/score-score', function(req, res){
  tools.queryToDb(`select id, name, score from scores order by score`)
  .then(ret => {
    res.json({score:ret})
  })
})
app.get('/score-kills', function(req, res){
  tools.queryToDb(`select id, name, kill from scores order by kill`)
  .then(ret => {
    res.json({score:ret})
})
})
app.get('/score-wins', function(req, res){
  tools.queryToDb(`select id, name, pwpwin from scores order by pwpwin`)
  .then(ret => {
    res.json({score:ret})
})
})
app.get('/score-loses', function(req, res){
  tools.queryToDb(`select id, name, pwplose from scores order by pwplose`)
  .then(ret => {
    res.json({score:ret})
  })
})



app.post('/get-uinfo',function(req, res){
  tools.queryToDbMain(`select follow from userstable where id=$1 limit 1`,[req.body.mid])
  .then(ret => {
    tools.queryToDbMain(`select  guild, follow from userstable where id=$1 limit 1`, [req.body.uid])
    .then(retu => {
      res.json({follow:ret[0].follow, ufollow:retu[0].follow, guild:retu[0].guild, statistics:scorestats.find(x => x.id === req.body.uid).score})
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
        INSERT INTO userstable (name, email, password, loginkey, state, guild)
        VALUES ($1,$2,$3,$4, 'o', -1);`, [uname, umail, upass, unicKey])
        .then(() => {
          tools.queryToDbMain(`select id from userstable where email = $1 limit 1`,[umail])
          .then(uret => {
            let tommorow = tools.addDays(1)
            tools.queryToDb(`insert into "Player" (id, premium) values($1, $2)`,[uret[0].id, tommorow])
            tools.queryToDb(`insert into scores (id, name, kill, score, pwpwin, pwplose) values ($1,$2,0,0,0,0)`,[uret[0].id,uname])
            tools.queryToDb(`insert into "hpBackups" (id, hp, ep) values ($1,50, 50)`,[uret[0].id])
            scorestats.push({id:uret[0].id, name:uname, kill:0, score:0, pwpwin:0, pwplose:0})
            playerstats.push({id:uret[0].id,hp:50,ep:50})
            nicknames.push({id:uret[0].id,name:uname})
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

  app.post('/prooflogin',function(req,res){
    tools.queryToDbMain(`select loginkey from userstable where id = $1 limit 1`,[req.body.id])
    .then(ret =>{
      if(ret.length>0&&ret[0].loginkey===req.body.loginkey) res.json({message:"success"})
      else res.json({message:"nope"})
    })
  })
  
  app.post("/login",function(req, res){
    const umail = req.body.umail;
    const upass = req.body.upassword;
  
    tools.queryToDbMain(`select id, password, loginkey, name from userstable where email = $1 limit 1`, [umail])
    .then((ret) => {
      if(ret.length === 0||ret[0].password !== upass)
      {
        res.json({message: "Невереный логин или пароль"});
      }
      else
      {
        tools.queryToDb('select id from "Player" where id=$1 limit 1',[ret[0].id])
        .then(rety => {
          if(rety.length===0)
          {
            let tommorow = tools.addDays(1)
            tools.queryToDb(`insert into "Player" (id, premium) values($1, $2)`,[ret[0].id, tommorow])
            tools.queryToDb(`insert into scores (id,name, kill, score, pwpwin, pwplose) values ($1,$2,0,0,0,0)`,[ret[0].id,ret[0].name])
            tools.queryToDb(`insert into "hpBackups" (id, hp, ep) values ($1,50, 50)`,[ret[0].id])
            scorestats.push({id:ret[0].id, name:ret[0].name, kill:0, score:0, pwpwin:0, pwplose:0})
            playerstats.push({id:ret[0].id,hp:50,ep:50})
            nicknames.push({id:ret[0].id,name:ret[0].name})
          }
        })
          res.json({uid: ret[0].id, name: ret[0].name, message: "Успешный вход", lkey: ret[0].loginkey});
      }
    });
  });

app.post('/p-stat', function(req,res){
    res.json({nickname:nicknames.find(x => x.id === req.body.id).name, hp:playerstats.find(x => x.id === req.body.id).hp, ep:playerstats.find(x => x.id === req.body.id).ep})
})

app.post('/fetch-guild',function(req,res){
  res.json({name:guildstats.find(x => x.id === req.body.id).name})
})



server.listen(port, hostname, () => {
    tools.queryToDb('select * from "hpBackups"')
    .then(
        ret => {
            if(ret.length > 0) playerstats = ret
        }
    )

    tools.queryToDb(`select * from scores`)
    .then(
      ret => {
        if(ret.length > 0) scorestats = ret
      }
    )

    tools.queryToDb('select id, premium from "Player"')
    .then(ret => {
        if(ret.length > 0) premStats = ret
    })

    tools.queryToDbMain('select id, name from userstable')
    .then(ret => {
      if(ret.length > 0) nicknames = ret
    })

    tools.queryToDbMain('select * from guild')
    .then(ret => {
      if(ret.length > 0) guildstats = ret
    }
    )
})