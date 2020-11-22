const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/message')

const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('A new user just connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))


  socket.on('createMessage', (message, cb) => {
    console.log('Create message', message)

    io.emit('newMessage', generateMessage(message.from, message.text))
    cb('This is the server:')
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected.')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
