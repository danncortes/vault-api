const userRouter = require('express')();
const { createUser, findUser, updateUser, deleteUser, loginUser, logoutUser, logoutUserAll } = require('../services/userService');
const auth = require('../middleware/auth');

userRouter.post('/users', createUser);
userRouter.post('/users/login', loginUser);
userRouter.get('/users/me', auth, findUser);
userRouter.patch('/users/me', auth, updateUser);
userRouter.delete('/users/me', auth, deleteUser);
userRouter.post('/users/logout', auth, logoutUser);
userRouter.post('/users/logoutAll', auth, logoutUserAll);

module.exports = userRouter;
