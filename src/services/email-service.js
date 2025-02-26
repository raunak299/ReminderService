const sender = require("../config/emailConfig");
const {
  up,
} = require("../migrations/20240719133801-create-notification-ticket");
const { TicketRepository } = require("../repository");

const repo = new TicketRepository();

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  sender.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    text: mailBody,
  });
};

const fetchPendingEmails = async (timeStamps) => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (err) {
    console.log("Something went wrong at service layer");
  }
};

const createNotification = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (err) {
    console.log("Something went wrong at service layer");
  }
};

const updateTicket = async (ticketId, data) => {
  try {
    const response = await repo.update(ticketId, data);
    return response;
  } catch (err) {
    console.log("Something went wrong at service layer");
  }
};

const subscribeEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_TICKET":
      await createNotification(data);
      break;
    case "SEND_BASIC_EMAIL":
      await sendBasicEmail();
      break;
    default:
      console.log("No event received");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
  subscribeEvents,
};
