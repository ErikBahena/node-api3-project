const express = require("express");

const server = express();

// timestamp middleware for express
const time = require("express-timestamp");
server.use(time.init);

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
const UsersRouter = require("./users/users-router");

const { logger } = require("./middleware/middleware");

server.use(logger);
server.use("/api/users", UsersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
