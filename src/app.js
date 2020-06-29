require('./db/mongoose');
const express = require('express');
const userRouter = require('./routes/userRouter');
const credRouter = require('./routes/credRouter');
const verifyRouter = require('./routes/verifyRouter');
const cors = require('cors');

const app = express();

// verifyEmail({ name: 'Daniel', email: 'danncortes@gmail.com', token: '123' });

app.options('*', cors()); // include before other routes
app.use(cors());
app.use(express.json());
app.use(verifyRouter);
app.use(userRouter);
app.use(credRouter);

module.exports = app;
