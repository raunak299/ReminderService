const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services");
const setUpJobs = require("./utils/jobs");
const ticketController = require("./controller/ticket-controller");
const EmailService = require("./services/email-service");

const setUpAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const { REMINDER_BINDING_KEY } = require("./config/serverConfig");
  const { subscribeMessage, createChannel } = require("./utils/messageQueue");

  app.post("/api/v1/tickets", ticketController.create);

  app.listen(PORT, async () => {
    console.log(`server started at ${PORT}`);
    // setUpJobs();
    const channel = await createChannel();
    subscribeMessage(
      channel,
      EmailService.subscribeEvents,
      REMINDER_BINDING_KEY
    );
  });
};

setUpAndStartServer();
