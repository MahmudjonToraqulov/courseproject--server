const express = require('express')
const cors = require('cors')

const allRoutes = require('./route/index')
const corsOption = require('./utils/corsOption')
const {setSocket} = require("./sockets/SetSocket");
const { Server } = require('socket.io');
const http = require("node:http");


const PORT = 5000

const app = express()
app.use(express.json())
app.use(cors(corsOption))

app.use('/api', allRoutes)

const server = http.createServer(app);
const io = new Server(server, {
    cors: corsOption,
    path: "/socket.io",
});
setSocket(io)

server.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
})