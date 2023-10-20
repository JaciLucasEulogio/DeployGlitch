const socket = io();
let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Welcome to the chat!",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    if (!value) {
      return "Necesitas un nombre de usuario antes de continuar!";
    }
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("requestMessageLogs");
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
    }
  }
});

socket.on("newUser", (data) => {
  Swal.fire({
    text: "Nuevo usuario conectado",
    toast: true,
    position: "top-right",
  });
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.user}: ${message.message}</br>`;
  });
  log.innerHTML = messages;
});
