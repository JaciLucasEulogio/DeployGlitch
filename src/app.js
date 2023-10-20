const express = require("express");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.router");
const { Server } = require("socket.io");

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

let messages = [];

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.broadcast.emit("newUser", "New user connected");

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });

  socket.on("requestMessageLogs", () => {
    socket.emit("messageLogs", messages);
  });
});
