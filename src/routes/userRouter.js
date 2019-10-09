const userRouter = require('express')();
const { fetchUsers, createUser, findUser, updateUser, deleteUser } = require('../services/userService');

userRouter.post('/users', createUser);
userRouter.get('/users', fetchUsers);
userRouter.get('/users/:id', findUser);
userRouter.patch('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

module.exports = userRouter;
