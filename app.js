const fs = require('fs')
const app = require('http').createServer(handler)
const debug = require('debug')
const io = require('socket.io')(app)


app.listen(3000, () => {
  console.log('Application démarrée sur le port 3000!')
})



const path = require('path')

function handler (req, res) {
  if(req.url == '/sock') {
    console.log('request on sock')
    fs.readFile('./views/client.html', function (err, data) {
      if(err) {
        return
      }
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(data)
    })
  } else if (req.url == '/updateMask') {
    console.log('request on updateMask')
      let data = {layout : "mylayout"}
      io.to('mask').emit('change', data)
  }
}

io.on('connection', function (socket) {
  socket.on('class declare', function (data) {
    socket.join(data.name)
    console.log(socket.id + " joined " + data.name)
  })
})
