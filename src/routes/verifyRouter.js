const verifyRouter = require('express').Router();

const { verifyAccount, newVerificationToken } = require('../services/verifyService');
const auth = require('../middleware/auth');

verifyRouter.post('/api/verify', verifyAccount);
verifyRouter.post('/api/verify/new', auth, newVerificationToken);

module.exports = verifyRouter;
