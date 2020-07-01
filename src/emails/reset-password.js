const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { FE_HOST, EMAIL_SENDER } = process.env;

const resetPassword = async ({ email, token }) => {
  try {
    await sgMail.send({
      to: email,
      from: EMAIL_SENDER,
      subject: 'Reset your password in Tresor',
      html: `<div>Hi ${email}, reset your password by clicking <a href="${FE_HOST}/reset-password/?verification_token=${token}">HERE</a></div>`
    });
  } catch (err) {
    console.log('verifyEmail -> err', err);
  }
};

module.exports = {
  resetPassword
};
