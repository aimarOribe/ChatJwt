const express = require("express");
const multiparty = require("connect-multiparty");
const userController = require("../controllers/user");

const mdUserImg = multiparty({uploadDir: "src/uploads/user"});

const app = express.Router();


app.get("/users", userController.index);
app.post("/users/store", mdUserImg, userController.store);
app.post("/users/login", userController.login);

module.exports = app;