const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services");
const setUpJobs = require("./utils/jobs");
const ticketController = require("./controller/ticket-controller");

const setUpAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", ticketController.create);

  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
    setUpJobs();
  });
};

setUpAndStartServer();
