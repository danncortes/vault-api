// const { SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { FE_HOST, EMAIL_SENDER } = process.env;

const verifyEmail = async ({ email, token }) => {
  try {
    await sgMail.send({
      to: email,
      from: EMAIL_SENDER,
      subject: 'Verify your account in Tresor',
      html: `<div>Hi ${email}, welcome to Tresor, please verify your account here: <a href="${FE_HOST}/account?verification_token=${token}">Verify my Account</a></div>`
    });
  } catch (err) {
    console.log('verifyEmail -> err', err);
  }
};

module.exports = {
  verifyEmail
};
