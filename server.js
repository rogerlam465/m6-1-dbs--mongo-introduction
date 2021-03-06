"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// ex 1
const { getUsers } = require("./exercises/exercise-1.3");
const { addUser } = require("./exercises/exercise-1.4");

// ex 2

const {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
} = require("./exercises/exercise-2");

const PORT = process.env.PORT || 7000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1

  .get("/exercise-1/users", getUsers)
  .post("/exercise-1/users", addUser)

  // exercise 2

  .post('/exercise-2/greeting', createGreeting)
  .get('/exercise-2/greeting/:_id', getGreeting)
  .get('/exercise-2/greetings/', getGreetings)
  .delete('/exercise-2/greeting/:_id', deleteGreeting)
  .put('/exercise-2/greeting/:id', updateGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
