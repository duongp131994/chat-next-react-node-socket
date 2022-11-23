const express = require('express')
const next = require('next')
const http = require("http");
const socketio = require("socket.io");

const port = parseInt(process.env.PORT || "3001", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    const server = http.createServer(app);

    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
        },
    });

    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        socket.username = username;
        next();
    });

    io.on('connection', (socket) => {
        console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

        //Khi user đăng nhập
        socket.on('send_user', (data) => {
            socket.broadcast.emit('receive_user', data)
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });

        socket.on("send_message", (data) => {
            console.log('send_message ' + data.name + ": " + data.message);

            //update database to client
            const newData = {
                id_user1: data.id_user2,
                id_user2: data.id_user1,
                id: Math.random().toString(),
                message: data.message,
                name: data.name,
                category: "receive",
            };
        })


    });


    server.listen(port, () => {
        console.log('Server đang chay tren cong ' + port);
    });
})
//
// var app = express();
// const server = http.createServer(app);
//
// const io = new socketio.Server({
//     cors: {
//         origin: "*",
//     }
// });
// io.attach(server);
//
//
// io.on("connection", (socket) => {
//     console.log("New client connected  " + socket.id);
//
//     socket.emit("getId", socket.id);
//
//     socket.on("sendDataClient", function(data) {
//         console.log(data)
//         io.emit("sendDataServer", { data });
//     })
//
//     socket.on("disconnect", () => {
//         console.log("Client disconnected");
//     });
// });
//
// server.listen(port, () => {
//     console.log('Server đang chay tren cong ' + port);
// });