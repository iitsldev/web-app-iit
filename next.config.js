const nextTranslate = require('next-translate');

module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    SENDGRID_MAIL_RECEIVER: process.env.SENDGRID_MAIL_RECEIVER,
    SENDGRID_MAIL_SENDER: process.env.SENDGRID_MAIL_SENDER,
  },
  ...nextTranslate(),
};
