const { User } = require('../db/models');

const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

const findUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const resp = await user.save();
    console.log('User created Successfully');
    res.status(201).send(resp);
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateUser = async (req, res) => {
  const { params: { id }, body } = req;

  const fieldsToUpdate = Object.keys(body);
  const allowedUpdates = ['name', 'password'];
  const isValidUpdate = fieldsToUpdate.every(field => {
    return allowedUpdates.includes(field);
  });

  if (!isValidUpdate) {
    return res.status(403).send({ error: 'Invalid Update' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, body, { runValidators: true, new: true });
    console.log('User updated Successfully');
    if (!user) {
      return res.status(404).send();
    }
    res.status(202).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  fetchUsers,
  createUser,
  findUser,
  updateUser,
  deleteUser
};
