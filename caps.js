"use strict";

const port = process.env.PORT || 3000;

const caps = require("socket.io")(port);

caps.on("connection", (socket) => {
  console.log(` Hello there ${socket.id}`);

  socket.on("pickup", (payload) => {
    socket.broadcast.emit("pickup", payload);
  });

  socket.on("in-transit", (payload) => {
    console.log("*** IN-TRANSIT EVENT ***");
    console.log(`Order for ${payload.customerName} on the Way`);
    // setTimeout(() => {
    //   console.log("*** DELIVERED EVENT ***");
    //   socket.broadcast.emit("delivered", payload);
    // }, 3000);
  });

  socket.on("delivered", (payload) => {
    socket.broadcast.emit("delivered", payload);
  });
});
