const userRouter = require('express').Router();

const { createUser, findUser, updateUser, deleteUser, loginUser, logoutUser, logoutUserAll, changeMasterKey } = require('../services/userService');
const auth = require('../middleware/auth');

userRouter.post('/api/auth/login', loginUser);
userRouter.post('/api/auth/logout', auth, logoutUser);
userRouter.post('/api/auth/logoutAll', auth, logoutUserAll);
userRouter.get('/api/auth/user', auth, findUser);
userRouter.post('/api/users', createUser);
userRouter.patch('/api/users/me', auth, updateUser);
userRouter.delete('/api/users/me', auth, deleteUser);
userRouter.post('/api/users/change-master-key', auth, changeMasterKey);

module.exports = userRouter;
