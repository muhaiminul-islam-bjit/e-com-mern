require('dotenv').config();

const smtpUserName = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';

module.exports = { smtpUserName, smtpPassword };
