const { MAILER } = require("../config/index");

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = await MAILER.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { sendBasicEmail };
