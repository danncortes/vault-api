require('./db/mongoose');
const express = require('express');
const userRouter = require('./routes/userRouter');
const credRouter = require('./routes/credRouter');
const cors = require('cors');

const app = express();
app.options('*', cors()); // include before other routes

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(credRouter);

module.exports = app;
