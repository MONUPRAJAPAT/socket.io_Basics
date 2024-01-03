const exprees = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = exprees();

const PORT = process.env.PORT || 9000;

const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "./public/index.html"));
});

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    console.log("A new message Received", message);
    io.emit("message",message);
  });
});
httpServer.listen(PORT, () => {
  console.log(`Express Server started at PORT:${PORT}`);
});
