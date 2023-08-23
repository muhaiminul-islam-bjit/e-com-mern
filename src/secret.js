require('dotenv').config();

const smtpUserName = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';

const uploadDir = process.env.UPLOAD_FILE || 'public/images/users';

module.exports = { smtpUserName, smtpPassword, uploadDir };
