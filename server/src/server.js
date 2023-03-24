const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.4:3000", "https://admin.socket.io"]
  }
});

const players = new Map();

io.on('connection', socket => {
  console.log(socket.id, "connected");
  console.log("currently available players", players);

  socket.on('register', user => {
    if(players.has(user)) {
      console.log(user, " registeration failed");
      socket.emit('fail', `An user is already present with username: ${user}`);
    } else {
      console.log(user, "registered");
      players.set(user, {id: socket.id, playing: false});
    }
  });

  socket.on('move', i => {
    console.log('received move index: ', i);
    socket.broadcast.emit('move', i);
  });

});

io.on('find', socket => {
  console.log(socket.id, "find req received");
  console.log("currently available players", players);
})

instrument(io, {
  auth: false
});