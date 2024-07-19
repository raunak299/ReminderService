const { Op } = require("sequelize");
const { NotificationTicket } = require("../models");

class TicketRepository {
  async getAll() {
    try {
      const tickets = await NotificationTicket.findAll();
      return tickets;
    } catch (err) {
      console.log("Something went wrong in repository layer");
      throw err;
    }
  }

  async create(data) {
    try {
      const ticket = await NotificationTicket.create(data);
      return ticket;
    } catch (err) {
      console.log("Something went wrong in repository layer");
      throw err;
    }
  }

  async get(filter) {
    try {
      const ticket = await NotificationTicket.findAll({
        where: {
          status: filter.status,
          notification: { [Op.lte]: new Date() },
        },
      });
      return ticket;
    } catch (err) {
      console.log("Something went wrong in repository layer");
      throw err;
    }
  }

  async update(ticketId, data) {
    try {
      const ticket = await NotificationTicket.findByPk(ticketId);
      if (data.status) {
        ticket.status = data.status;
        await ticket.save();
      }
      return ticket;
    } catch (err) {
      console.log("Something went wrong in repository layer");
      throw err;
    }
  }
}

module.exports = TicketRepository;
