const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"]
  }
});

const players = new Map();

io.on('connection', socket => {
  console.log(socket.id, "connected");

  socket.on('register', user => {
    console.log('Setting username to:', user);
    if(players.has(user)) {
      socket.emit('failed', `An user is already present with username: ${user}`);
    } else {
      players.set(user, socket.id);
    }
  });

  socket.on('move', i => {
    console.log('received move index: ', i);
    socket.broadcast.emit('move', i);
  });

});

instrument(io, {
  auth: false
});