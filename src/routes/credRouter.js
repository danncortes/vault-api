const credRouter = require('express')();
const { createCred, fetchCred, findCred, updateCred, deleteCred } = require('../services/credService');
const auth = require('../middleware/auth');

credRouter.post('/cred', auth, createCred);
credRouter.get('/cred', auth, fetchCred);
credRouter.get('/cred/:id', auth, findCred);
credRouter.patch('/cred/:id', auth, updateCred);
credRouter.delete('/cred/:id', auth, deleteCred);

module.exports = credRouter;
