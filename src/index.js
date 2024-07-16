const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services");

const setUpAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
    // sendBasicEmail(
    //   "Support <support@admin.com>",
    //   "iamraunak299@gmail.com",
    //   "This is a testing email",
    //   "Hey !! How are you ? I hope you like the support"
    // );
  });
};

setUpAndStartServer();
