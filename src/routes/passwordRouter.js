const passwordRouter = require('express').Router();

const { newPasswordToken, verifyPasswordToken, resetPassword, changePassword, checkPassword } = require('../services/passwordService');
const auth = require('../middleware/auth');

passwordRouter.post('/api/password', newPasswordToken);
passwordRouter.post('/api/password/verify', verifyPasswordToken);
passwordRouter.post('/api/password/reset', resetPassword);
passwordRouter.post('/api/password/change', auth, changePassword);
passwordRouter.post('/api/password/check-password', auth, checkPassword);

module.exports = passwordRouter;
