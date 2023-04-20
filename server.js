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

var scorestats = []
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

app.post('/prooflogin',function(req,res){
  tools.queryToDbMain(`select loginkey from userstable where id = $1 limit 1`,[req.body.id])
  .then(ret =>{
    if(ret.length>0&&ret[0].loginkey===req.body.loginkey) res.json({message:"success"})
    else res.json({message:"nope"})
  })
})

app.post('/fetch-guild',function(req,res){
  res.json({name:guildstats.find(x => x.id === req.body.id).name})
})

app.post('/add-new-user-props', function(req,res){
  if(req.body.id)
  {
    let tommorow = tools.addDays(1)
    tools.queryToDb(`insert into "Player" (id, premium) values($1, $2)`,[req.body.id, tommorow])
    tools.queryToDb(`insert into scores (id, name, kill, score, pwpwin, pwplose) values ($1,$2,0,0,0,0)`,[req.body.id, req.body.name])
    scorestats.push({id:req.body.id, name:req.body.name, kill:0, score:0, pwpwin:0, pwplose:0})
    res.json({message:'success'})
  }
})


server.listen(port, hostname, () => {
    

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
    
    tools.queryToDbMain('select * from guild')
    .then(ret => {
      if(ret.length > 0) guildstats = ret
    }
    )
})