const nodemailer = require('nodemailer');
const { smtpUserName, smtpPassword } = require('../secret');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

const sendEmail = async email => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USERNAME, // sender address
      to: email.email, // list of receivers
      subject: email.subject, // Subject line
      html: email.html, // html body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.response);
  } catch (error) {
    console.error('Error occured while sending email: ', error);
    throw error;
  }
};

module.exports = { sendEmail };
