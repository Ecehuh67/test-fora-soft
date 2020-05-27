const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.json());

const users = ['Albert', 'Colin', 'Deny672'];
const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
      }
    : {
        users: [],
        messages: [],
      };

  res.json(obj);
});

app.post('/rooms', (req, res) => {
  const { roomId } = req.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ])
    );
  }

  res.send();
});

io.on('connection', (socket) => {
  socket.on('CHECK_NAME', ({ userName }) => {
    if (!users.includes(userName)) {
      users.push(userName);
      socket.emit('CHECK_NAME', true);
    } else {
      socket.emit('CHECK_NAME', false);
      console.log('wrong');
    }
  });

  socket.on('ROOM_JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomId).get('messages').push(obj);
    socket.to(roomId).broadcast.emit('ROOM:SET_MESSAGES', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });

  console.log('User connected', socket.id);
});

server.listen(3001, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('Server has launched');
  }
});
