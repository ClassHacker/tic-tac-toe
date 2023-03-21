const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"]
  }
});

io.on('connection', socket => {
  let username = "";
  console.log(socket.id, "connected");
  socket.on('register', user => {
    console.log('Setting username to:', user);
    username = user;
  });
  socket.on('move', i => {
    console.log('received move index: ', i);
    socket.broadcast.emit('move', i);
  });
});

instrument(io, {
  auth: false
});