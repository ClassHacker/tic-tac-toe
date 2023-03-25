const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.4:3000", "https://admin.socket.io"]
  }
});

const players = new Map();

io.on('connection', socket => {
  let username;
  console.log(socket.id, "connected");

  socket.on('register', user => {
    username = user;
    if(players.has(user)) {
      console.log(user, "registration failed");
      socket.emit('fail', `An user is already present with username: ${user}`);
      console.log("currently available players", players);
    } else {
      console.log(user, "registered");
      players.set(user, {id: socket.id, playing: false});
      socket.emit("success");
    }
    console.log("currently available players", players);
  });

  socket.on('move', i => {
    console.log('received move index: ', i);
    socket.broadcast.emit('move', i);
  });

  socket.conn.on("close", (reason) => {
    console.log(reason, username);
    if(players.has(username)) players.delete(username);
  });

});

io.on('find', socket => {
  console.log(socket.id, "find req received");
  console.log("currently available players", players);
})

instrument(io, {
  auth: false
});