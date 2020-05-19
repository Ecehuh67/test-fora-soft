const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.send(`I'm here`);
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