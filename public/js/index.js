let socket = io()

socket.on('connect', () => {
  console.log('Connected to server.')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
})

socket.on('newMessage', (message) => {
  console.log('New message', message)
  let li = document.createElement('li')
  li.innerText = `${message.from}: ${message.text}`

  document.querySelector('body').appendChild(li)
})

socket.on('newLocationMessage', (message) => {
  console.log('New location message', message)
  let li = document.createElement('li')
  let a = document.createElement('a')
  a.setAttribute('target', '_blank')
  a.setAttribute('href', message.url)
  a.innerHTML = 'My current location'
  li.appendChild(a)

  document.querySelector('body').appendChild(li)
})

document.querySelector('#submit-btn').addEventListener('click', (e) => {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector('input[name="message"]').value
  }, () => {

  })
})

document.querySelector('#send-location').addEventListener('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, () => {
    alert('Unable to fetch location.')
  })
})