const nodemailer = require("nodemailer");

const { EMAIL_ID, EMAIL_PASS } = require("./server-config");

const mailSender = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: EMAIL_ID, pass: EMAIL_PASS },
});

module.exports = mailSender;
