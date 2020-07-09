const passwordRouter = require('express').Router();

const { newPasswordToken, verifyPasswordToken, resetPassword, changePassword } = require('../services/passwordService');
const auth = require('../middleware/auth');

passwordRouter.post('/api/password', newPasswordToken);
passwordRouter.post('/api/password/verify', verifyPasswordToken);
passwordRouter.post('/api/password/reset', resetPassword);
passwordRouter.post('/api/password/change', auth, changePassword);

module.exports = passwordRouter;
