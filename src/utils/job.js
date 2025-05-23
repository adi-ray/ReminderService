const cron = require("node-cron");
const emailService = require("../services/email-service");
const { MAILER } = require("../config/index");

/**
 * This function will setup the cron job
 * Every 5 minutes
 * We will check are there any pending emails which was expected to be sent by now and is pending
 */

const setupJobs = () => {
  cron.schedule("*/5 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      MAILER.sendMail(
        {
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: "SENT" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
