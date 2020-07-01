const passwordRouter = require('express').Router();

const { newPasswordToken, verifyPasswordToken, resetPassword } = require('../services/passwordService');

passwordRouter.post('/api/password', newPasswordToken);
passwordRouter.post('/api/password/verify', verifyPasswordToken);
passwordRouter.post('/api/password/reset', resetPassword);

module.exports = passwordRouter;
