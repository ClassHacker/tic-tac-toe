const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io/"]
  }
});

io.on('connection', socket => {
  console.log(socket.id, "connected");
  socket.on('move', i => {
    console.log('received move index: ', i);
    socket.broadcast.emit('move', i);
  })
})

instrument(io, {
  auth: false
});