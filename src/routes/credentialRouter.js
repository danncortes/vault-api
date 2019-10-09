const credentialRouter = require('express')();
const { fetchCredentials, createCredential, findCredential, updateCredential, deleteCredential } = require('../services/credentialService');

credentialRouter.post('/credential', createCredential);
credentialRouter.get('/credentials/:userId', fetchCredentials);
credentialRouter.get('/credentials/:userId/:id', findCredential);
credentialRouter.patch('/credentials/:userId/:id', updateCredential);
credentialRouter.delete('/credentials/:userId/:id', deleteCredential);

module.exports = credentialRouter;
