const credRouter = require('express').Router();

const {
  createCred,
  fetchCred,
  findCred,
  updateCred,
  deleteCred
} = require('../services/credService');
const auth = require('../middleware/auth');

credRouter.get('/api/credential', auth, fetchCred);
credRouter.post('/api/credential', auth, createCred);
credRouter.get('/api/credential/:id', auth, findCred);
credRouter.patch('/api/credential/:id', auth, updateCred);
credRouter.delete('/api/credential/:id', auth, deleteCred);

module.exports = credRouter;
