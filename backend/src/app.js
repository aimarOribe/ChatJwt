const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const userRoutes = require("./router/user");
const messageRoutes = require("./router/message");

const { API_VERSION, API_NAME } = process.env;

const app = express();

const http = require("http");
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:4200"
    }
})

const basePath = `/${API_NAME}/${API_VERSION}/`

//IMPORTAR RUTAS
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("src/uploads"));
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnection;
    next();
});
app.use(basePath, userRoutes);
app.use(basePath, messageRoutes);

//EXPORTAR RUTAS
io.on("connect", (socket) => {
    socket.on("typing", (data)=> {
        io.emit("listening", data);
    });

    socket.on("disconnect", ()=> {
        console.log("Usuario Desconectado");
    });
});

module.exports = httpServer;
