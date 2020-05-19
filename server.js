const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms)
});

app.post('/rooms', (req, res) => {
  const {roomId, userName} = req.body;

  if(!rooms.has(roomId)) {
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []]
    ]))
  }

  res.send();
});

io.on('connection', (socket) => {
    console.log('User connected', socket.id);
});

server.listen(3001, (err) => {
    if(err) {
        throw new Error(err)
    } else {
        console.log('Server has launched');
    }
});