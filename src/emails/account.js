// const { SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const verifyEmail = async ({ email, name, token }) => {
  try {
    await sgMail.send({
      to: email,
      from: 'tresorapp24@gmail.com',
      subject: 'Verify your account in Vault',
      html: `<div>Hi ${name}, welcome to Vault, please verify your account here: <a href="${token}">Verify my Account</a></div>`
    });
  } catch (err) {
    console.log('verifyEmail -> err', err);
  }
};

module.exports = {
  verifyEmail
};
