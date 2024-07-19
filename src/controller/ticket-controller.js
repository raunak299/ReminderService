const TicketService = require("../services/email-service");

const create = async (req, res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully registered a email reminder",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      data: {},
      err: err,
      message: "Unable to registered a email reminder",
    });
  }
};

module.exports = {
  create,
};
