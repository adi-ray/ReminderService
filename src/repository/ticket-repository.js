const { NotificationTicket } = require("../models/index");
const { Op } = require("sequelize");

class TicketRepository {
  async create(data) {
    try {
      const ticket = await NotificationTicket.create(data);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const tickets = await NotificationTicket.findAll();
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async get(filter) {
    try {
      const tickets = await NotificationTicket.findAll({
        where: {
          status: filter.status,
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const ticket = await NotificationTicket.findByPk(id);
      if (data.status) ticket.status = data.status;
      await ticket.save();
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketRepository;
