require('dotenv').config()
const http = require('http');
const express = require("express");
const cors = require('cors');
const { Server } = require("socket.io");

const hostname = '192.168.1.3'
const app = express();
const port = process.env.DEFAULT_PORT;

app.use(express.urlencoded());
app.use(cors({origin: process.env.REACT_FRONT_PATH}));
app.use(express.json());


const server = http.createServer(app);

app.get('/', function(req,res){
    res.json({message:"success"})
})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});